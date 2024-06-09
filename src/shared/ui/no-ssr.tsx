import { FC, ReactNode, useEffect, useState } from "react";

type NoSSRProps = {
  children: ReactNode;
};

export const NoSSR: FC<NoSSRProps> = ({ children }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setShouldRender(true);
  }, []);

  if (shouldRender) return children;

  return null;
};
