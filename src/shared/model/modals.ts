import { FC } from "react";
import { createEvent, createStore, sample } from "effector";

export type ModalData = {
  name: string;
  Component: FC;
};

const $modals = createStore<ModalData[]>([]);

const push = createEvent<ModalData>();
const close = createEvent<string>();
const closeAll = createEvent();

sample({
  clock: push,
  source: $modals,
  fn: (modals, newModal) => [...modals, newModal],
  target: $modals,
});

sample({
  clock: close,
  source: $modals,
  fn: (modals, name) => {
    const index = modals.findLastIndex((modal) => modal.name === name);

    if (index !== undefined) {
      const result = [...modals];

      result.splice(index, 1);

      return result;
    }

    return modals;
  },
  target: $modals,
});

sample({
  clock: closeAll,
  fn: () => [],
  target: $modals,
});

export const model = {
  push,
  close,
  closeAll,
  $modals,
};
