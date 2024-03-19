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
  "whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-violet-600 hover:bg-violet-500 focus-visible:ring-violet-600 focus-visible:ring-offset-gray-50",
        secondary:
          "bg-gray-50 hover:bg-gray-300 text-neutral-800 focus-visible:ring-offset-violet-600 focus-visible:ring-gray-50",
        warning: "bg-amber-400 hover:bg-amber-300 text-neutral-800",
        error: "bg-red-400 text-neutral-800 hover:bg-red-500",
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
    { className, size = "md", variant = "primary", type = "button", ...props },
    ref,
  ) => {
    return (
      <button
        {...props}
        type={type}
        ref={ref}
        className={clsx(className, button({ variant, size }))}
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
      className={clsx(className, "outline-none")}
    >
      <Icon icon={icon} {...iconProps} />
    </button>
  );
});

IconButton.displayName = "IconButton";
Button.displayName = "Button";
Button.Icon = IconButton;
