import { faClose } from "@fortawesome/free-solid-svg-icons";

export const icons = { faClose };

type WithoutFaPrefix<T> = T extends `fa${infer P}` ? Uncapitalize<P> : never;

export type DynagraphIcon = WithoutFaPrefix<keyof typeof icons>;
