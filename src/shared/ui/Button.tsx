import {
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

import { Icon, type IconProps } from "./Icon";

type ButtonVariant = "primary" | "secondary" | "error" | "warning";
type ButtonSize = "md" | "lg";

const button = cva(
  "whitespace-nowrap outline-none focus:ring-2 focus:ring-offset-2 text-neutral-50 border-[1px]",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-violet-500 hover:bg-violet-500 focus:ring-violet-500 focus:ring-offset-neutral-50",
        secondary:
          "border-neutral-400 bg-neutral-50 hover:bg-neutral-300 text-neutral-800 focus:ring-offset-violet-500 focus-visible:ring-neutral-50",
        warning:
          "border-transparent bg-amber-400 hover:bg-amber-300 text-neutral-800",
        error:
          "border-transparent bg-red-400 text-neutral-800 hover:bg-red-500",
      },
      size: {
        md: "text-xs px-8 py-2 rounded font-semibold",
        lg: "text-sm px-8 py-3 rounded font-semibold",
      },
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  block?: boolean;
};

type ButtonComponent = ForwardRefExoticComponent<
  Omit<PropsWithClassName<ButtonProps>, "ref"> &
    RefAttributes<HTMLButtonElement>
> & {
  Icon: typeof IconButton;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Button: ButtonComponent = forwardRef<
  HTMLButtonElement,
  PropsWithClassName<ButtonProps>
>(
  (
    {
      className,
      block,
      size = "md",
      variant = "primary",
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        type={type}
        ref={ref}
        className={clsx(
          block && "w-full",
          button({ variant, size }),
          className,
        )}
      />
    );
  },
);

const IconButton = forwardRef<
  HTMLButtonElement,
  PropsWithClassName<
    ButtonProps & { iconProps?: Omit<IconProps, "icon"> } & {
      icon: IconProps["icon"];
    }
  >
>(({ className, iconProps, icon, ...props }, ref) => {
  return (
    <button
      {...props}
      type="button"
      ref={ref}
      className={clsx(
        className,
        "h-6 w-6 rounded outline-none focus:ring-2 focus:ring-violet-500",
      )}
    >
      <Icon icon={icon} size="lg" {...iconProps} />
    </button>
  );
});

IconButton.displayName = "IconButton";
Button.displayName = "Button";
Button.Icon = IconButton;
