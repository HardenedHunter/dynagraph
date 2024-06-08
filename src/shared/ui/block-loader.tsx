import clsx from "clsx";

import { Icon } from "~/shared/ui/icon";

export const BlockLoader: FCC = ({ className }) => {
  return (
    <div className={clsx("flex h-full items-center justify-center", className)}>
      <Icon icon="spinner" className="animate-spin" />
    </div>
  );
};
