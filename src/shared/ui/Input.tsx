import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

type InputProps = ComponentProps<"input"> & {
  error?: string;
  label?: string;
  block?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, block, label, ...props }, ref) => {
    return (
      <label className={clsx(block && "w-full")}>
        {label && <p className="mb-1">{label}</p>}
        <input
          ref={ref}
          className={clsx(
            className,
            block && "w-full",
            "rounded border-neutral-300",
            error
              ? "border-red-600 focus:border-red-600 focus:ring-red-600"
              : "focus:border-violet-500 focus:ring-violet-500",
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
      </label>
    );
  },
);

Input.displayName = "Input";
