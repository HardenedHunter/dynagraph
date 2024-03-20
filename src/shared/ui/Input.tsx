import clsx from "clsx";
import { ComponentProps, forwardRef } from "react";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  block?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, block, label, ...props }, ref) => {
    return (
      <label className={clsx(block && "w-full")}>
        {label && <p>{label}</p>}
        <input
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

Input.displayName = "Input";
