import { FC } from "react";
import { createEvent, createStore, sample } from "effector";

export type ModalData = {
  isClosing: boolean;
  onClose?: () => void;
  name: string;
  Component: FC;
};

const $modal = createStore<ModalData | null>(null);

const push = createEvent<ModalData>();
const close = createEvent<(() => void) | void>();
const remove = createEvent();

sample({ clock: push, target: $modal });

sample({
  clock: close,
  source: $modal,
  filter: (data): data is ModalData => !!data,
  fn: (data: ModalData, onClose) => ({
    ...data,
    isClosing: true,
    onClose: onClose ?? undefined,
  }),
  target: $modal,
});

sample({
  clock: remove,
  source: $modal,
  filter: (data): data is ModalData => !!data,
  fn: (data: ModalData) => {
    // TODO Сайд-эффект в чистой функции, не очень хорошо
    if (data.onClose) data.onClose();

    return null;
  },
  target: $modal,
});

export const model = {
  push,
  close,
  remove,
  $modal,
};
