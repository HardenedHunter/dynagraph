import { useUnit } from "effector-react";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";

import { modalModel } from "~/shared/model";

export const Modals: FC = () => {
  const [modal, close] = useUnit([modalModel.$modal, modalModel.close]);

  const { asPath } = useRouter();

  useEffect(close, [asPath, close]);

  if (!modal) return null;

  const { Component } = modal;

  return <Component />;
};
