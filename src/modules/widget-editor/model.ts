import { createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

import { SerializedWidget } from "~/entities/widget";

const $serialized = createStore<SerializedWidget | null>(null);

const setSerialized = createEvent<SerializedWidget | null>();

sample({ clock: setSerialized, target: $serialized });

const Gate = createGate();

$serialized.reset(Gate.close);

export const editorModel = {
  $serialized,
  setSerialized,
  Gate,
};
