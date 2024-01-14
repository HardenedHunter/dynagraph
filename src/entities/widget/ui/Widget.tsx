import { forwardRef, ComponentProps } from "react";
import clsx from "clsx";

export type WidgetProps = ComponentProps<"div">;

export const Widget = forwardRef<
  HTMLDivElement,
  PropsWithClassName<WidgetProps>
>(({ className, ...props }, ref) => {
  // const { id } = useWidgetContext();

  return (
    <div
      ref={ref}
      className={clsx(className, "rounded-xl bg-neutral-800 p-6")}
      {...props}
    />
  );
});

Widget.displayName = "Widget";
