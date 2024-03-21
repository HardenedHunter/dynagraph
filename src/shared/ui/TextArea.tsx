import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

type TextAreaProps = ComponentProps<"textarea"> & {
  error?: string;
  label?: string;
  block?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, block, label, ...props }, ref) => {
    return (
      <label className={clsx(block && "w-full")}>
        {label && <p className="mb-1">{label}</p>}
        <textarea
          ref={ref}
          className={clsx(
            className,
            block && "w-full",
            "rounded border-neutral-300",
            error
              ? "border-red-600 focus:border-red-600 focus:ring-red-600"
              : "focus:border-violet-600 focus:ring-violet-600",
          )}
          {...props}
        />
        {error && <p className="text-sm text-red-400">{error}</p>}
      </label>
    );
  },
);

TextArea.displayName = "TextArea";
