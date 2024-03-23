import * as iconImports from "./iconImports";

export const icons = iconImports;

type CamelToKebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? "-" : ""}${Lowercase<T>}${CamelToKebabCase<U>}`
  : S;

type WithoutFaPrefix<T> = T extends `fa${infer P}`
  ? CamelToKebabCase<Uncapitalize<P>>
  : never;

export type DynagraphIcon = WithoutFaPrefix<keyof typeof icons>;
