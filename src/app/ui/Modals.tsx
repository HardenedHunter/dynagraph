import { useUnit } from "effector-react";
import { FC, useEffect } from "react";
import { useRouter } from "next/router";

import { modalsModel } from "~/shared/model";

export const Modals: FC = () => {
  const [modals, closeAll] = useUnit([
    modalsModel.$modals,
    modalsModel.closeAll,
  ]);

  const hasOpenModals = modals.length > 0;

  const { asPath } = useRouter();

  useEffect(closeAll, [asPath, closeAll]);

  console.log(modals);
  if (!hasOpenModals) return null;

  return (
    <>
      {modals.map((modalData, i) => {
        const { name, Component } = modalData;
        const isLast = i === modals.length - 1;

        return (
          <div key={i} style={!isLast ? { opacity: 0 } : undefined}>
            <Component key={name} />
          </div>
        );
      })}
    </>
  );
};
