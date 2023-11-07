import clsx from "clsx";

export type WidgetProps = {
  children: React.ReactNode;
};

export const Widget: FCC<WidgetProps> = ({ className, children }) => {
  // const { id } = useWidgetContext();

  return (
    <div
      className={clsx(
        className,
        "relative min-h-[12rem] w-80 rounded-xl bg-neutral-800 p-6",
      )}
    >
      {children}
    </div>
  );
};
