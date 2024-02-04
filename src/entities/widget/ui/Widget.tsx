import { forwardRef, ComponentProps } from "react";
import clsx from "clsx";

export type WidgetProps = ComponentProps<"div">;

export const Widget = forwardRef<
  HTMLDivElement,
  PropsWithClassName<WidgetProps>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        className,
        "overflow-hidden rounded-xl bg-neutral-800 p-6",
      )}
      {...props}
    />
  );
});

Widget.displayName = "Widget";
