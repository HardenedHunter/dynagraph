import { FC } from "react";
import { useUnit } from "effector-react";
import { useFormContext } from "react-hook-form";
import clsx from "clsx";

import { Button, Input, Panel } from "~/shared/ui";
import { Widget } from "~/entities/widget";
import { WidgetEditorData } from "../types";
import { editorModel } from "../model";

type PreviewSectionProps = {
  isLoading?: boolean;
  onExit: () => void;
};

export const PreviewSection: FC<PreviewSectionProps> = ({
  isLoading,
  onExit,
}) => {
  const serialized = useUnit(editorModel.$serialized);

  const {
    register,
    formState: { isDirty, errors },
  } = useFormContext<WidgetEditorData>();

  const isExitDisabled = isLoading;
  const isSaveDisabled = !isDirty || isLoading;

  const exitText = isDirty ? "Отменить и выйти" : "Выйти";
  const exitVariant = isDirty ? "error" : "secondary";

  return (
    <section className="flex flex-col p-4">
      <div className="flex justify-end gap-2">
        <Button
          variant={exitVariant}
          fillVariant="border"
          onClick={onExit}
          disabled={isExitDisabled}
        >
          {exitText}
        </Button>
        <Button type="submit" disabled={isSaveDisabled}>
          Сохранить
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          block
          label="Название"
          error={errors.name?.message}
          {...register("name")}
        />
        <div>
          <p>Предпросмотр</p>
          <Panel
            className={clsx(
              "mt-1 aspect-[21/9]",
              !serialized && "bg-violet-200",
            )}
          >
            {!serialized && (
              <div className="flex h-full w-full items-center justify-center text-center">
                <p>
                  Добавьте код и нажмите &quot;Выполнить&quot;,
                  <br />
                  чтобы активировать предпросмотр
                </p>
              </div>
            )}
            {serialized && <Widget serialized={serialized} />}
          </Panel>
        </div>
      </div>
    </section>
  );
};
