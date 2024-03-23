import { FC } from "react";
import clsx from "clsx";

import { Icon } from "~/shared/ui";

type DashboardCoverProps = {
  className?: string;
  /** В виде bg-COLOR-VALUE */
  backgroundColor: string;
  icon: string;
};

export const DashboardCover: FC<DashboardCoverProps> = ({
  className,
  backgroundColor,
  icon,
}) => {
  return (
    <div
      className={clsx(
        className,
        `flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-neutral-50 ${backgroundColor}`,
      )}
    >
      <Icon
        // @ts-expect-error Пусть ругается
        icon={icon}
        size="lg"
        className="drop-shadow-[0_0_5px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
};
