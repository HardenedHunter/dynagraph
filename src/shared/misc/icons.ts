import { faClose, faSpinner } from "@fortawesome/free-solid-svg-icons";

export const icons = { faClose, faSpinner };

type WithoutFaPrefix<T> = T extends `fa${infer P}` ? Uncapitalize<P> : never;

export type DynagraphIcon = WithoutFaPrefix<keyof typeof icons>;
