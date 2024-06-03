import { FC, PropsWithChildren } from "react";
import clsx from "clsx";

import { Panel } from "~/shared/ui";

type WidgetPanelProps = PropsWithChildren<{
  className?: string;
  name: string;
}>;

export const WidgetPanel: FC<WidgetPanelProps> = ({
  children,
  className,
  name,
}) => (
  <Panel className={clsx("relative pt-10", className)}>
    <p className="absolute left-4 top-2 text-xs font-bold">{name}</p>
    {children}
  </Panel>
);
