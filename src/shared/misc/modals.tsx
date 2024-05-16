import { getClientScope } from "@effector/next";
import { scopeBind } from "effector";
import { FC } from "react";

import { modalModel } from "~/shared/model";

type RequiredKeys<T> = {
  [K in keyof T]-?: Record<string, never> extends Pick<T, K> ? never : K;
}[keyof T];

type BaseActions = {
  name: string;
  close: () => Promise<void>;
};

// Умная типизация функции xxxModal.open
// в зависимости от пропсов (Т) самой модалки
type ActionsWithOptionalArgument<
  T extends Record<string, unknown> = Record<string, never>,
> =
  // Если пропсов нет (extends Record<string, never>), функция без аргументов
  T extends Record<string, never>
    ? { open: () => Promise<void> }
    : // Если в пропсах все поля опциональные, аргумент функции тоже опциональный
    RequiredKeys<T> extends never
    ? { open: (data?: T) => Promise<void> }
    : // В других случаях аргумент (пропсы) прокидывать обязательно
      { open: (data: T) => Promise<void> };

type CreateModalActionsReturn<
  T extends Record<string, unknown> = Record<string, never>,
> = BaseActions & ActionsWithOptionalArgument<T>;

const getPropslessComponent = <
  T extends Record<string, unknown> = Record<string, never>,
>(
  Component: FC<T>,
  data: T extends Record<string, never> ? never : T,
) => {
  // Создаём "замыкание" компонента с пропсами внутри,
  // чтобы не тянуть отдельно оригинальный компонент + пропсы через стор
  // и не думать о типах в компоненте Modals.tsx
  const PropslessComponent: FC = () => {
    const props = data ?? {};

    return <Component {...props} />;
  };

  PropslessComponent.displayName = Component.displayName;

  return PropslessComponent;
};

/**
 * Создание функций для управления модальным окном (open, close)
 * с привязкой к стору
 * */
export const createModalActions = <
  T extends Record<string, unknown> = Record<string, never>,
>({
  name,
  Component,
}: {
  Component: FC<T>;
  name: string;
}): CreateModalActionsReturn<T> => {
  return {
    name,
    open: async (data: T extends Record<string, never> ? never : T) => {
      const PropslessComponent = getPropslessComponent(Component, data);
      const scope = getClientScope();

      if (scope) {
        await new Promise<void>((resolve) => {
          const event = scopeBind(modalModel.open, { scope });

          event({
            name,
            Component: PropslessComponent,
            isClosing: false,
            onEnter: resolve,
          });
        });
      }
    },
    close: async () => {
      const scope = getClientScope();

      if (scope) {
        await new Promise<void>((resolve) => {
          const event = scopeBind(modalModel.close, { scope });

          event(resolve);
        });
      }
    },
  } as unknown as CreateModalActionsReturn<T>;
};
