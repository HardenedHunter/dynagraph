import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

type TextAreaProps = ComponentProps<"textarea"> & {
  label?: string;
  block?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, block, label, ...props }, ref) => {
    return (
      <label className={clsx(block && "w-full")}>
        {label && <p>{label}</p>}
        <textarea
          ref={ref}
          className={clsx(
            className,
            block && "w-full",
            "rounded border-neutral-300 focus:border-violet-600 focus:ring-violet-600",
          )}
          {...props}
        />
      </label>
    );
  },
);

TextArea.displayName = "TextArea";
