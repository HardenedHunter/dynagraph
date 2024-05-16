import { FC } from "react";
import { createEffect, createEvent, createStore, sample } from "effector";
import { spread } from "patronum";

export type ModalData = {
  isClosing: boolean;
  onLeave?: () => void;
  onEnter?: () => void;
  name: string;
  Component: FC;
};

const $modal = createStore<ModalData | null>(null);

// Используются внешним миром для инициации открытия
const open = createEvent<ModalData>();
const close = createEvent<(() => void) | void>();

// Вызываются только самим ModalWindow,
// когда закончилась анимация открытия/закрытия
const enter = createEvent();
const leave = createEvent();

// Эффект, в котором будут резолвиться промисы после enter/leave
const resolveAnimationFx = createEffect((resolve?: () => void) => resolve?.());

sample({ clock: open, target: $modal });

sample({
  clock: close,
  source: $modal,
  filter: (data): data is ModalData => !!data,
  fn: (data: ModalData, onLeave) => ({
    ...data,
    isClosing: true,
    onLeave: onLeave ?? undefined,
  }),
  target: $modal,
});

sample({
  clock: enter,
  source: $modal,
  filter: (data): data is ModalData => !!data,
  fn: (data: ModalData) => data.onEnter,
  target: resolveAnimationFx,
});

sample({
  clock: leave,
  source: $modal,
  filter: (data): data is ModalData => !!data,
  fn: (data: ModalData) => ({ modal: null, onLeave: data.onLeave }),
  target: spread({ modal: $modal, onLeave: resolveAnimationFx }),
});

export const model = {
  open,
  close,
  enter,
  leave,
  $modal,
};
