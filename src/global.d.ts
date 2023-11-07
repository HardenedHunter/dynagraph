type PropsWithClassName<T = Record<string, unknown>> = T & {
  className?: string;
};

type FCC<T = Record<string, unknown>> = React.FC<PropsWithClassName<T>>;
