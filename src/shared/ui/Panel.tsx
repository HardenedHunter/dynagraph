import { forwardRef, ComponentProps } from "react";
import clsx from "clsx";

export type PanelProps = ComponentProps<"div">;

export const Panel = forwardRef<HTMLDivElement, PropsWithClassName<PanelProps>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(className, "rounded-xl bg-neutral-800 p-6")}
        {...props}
      />
    );
  },
);

Panel.displayName = "Panel";
