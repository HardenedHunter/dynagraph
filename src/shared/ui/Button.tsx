import React, {
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

import { Icon, type IconProps } from "./Icon";

export type ButtonVariant = "primary" | "secondary" | "error" | "warning";
export type ButtonFillVariant = "border" | "full";
export type ButtonSize = "md" | "lg";

const button = cva(
  "whitespace-nowrap outline-none focus:ring-2 focus:ring-offset-2 text-neutral-50 border-[1px]",
  {
    variants: {
      variant: {
        primary: "focus:ring-violet-500 focus:ring-offset-neutral-50",
        secondary:
          "border-neutral-400 bg-neutral-50 hover:bg-neutral-200 text-neutral-800 focus:ring-neutral-800 focus:ring-offset-neutral-50",
        warning:
          "border-transparent bg-amber-400 hover:bg-amber-300 text-neutral-800",
        error: "focus:ring-red-500 focus:ring-offset-neutral-50",
      },
      fillVariant: {
        border: "",
        full: "",
      },
      size: {
        md: "text-xs px-8 py-2 rounded font-semibold",
        lg: "text-sm px-8 py-3 rounded font-semibold",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        fillVariant: "full",
        class: "bg-violet-500 hover:bg-violet-500",
      },
      {
        variant: "primary",
        fillVariant: "border",
        class:
          "border-violet-500 bg-neutral-50 hover:bg-violet-100 text-violet-800",
      },
      {
        variant: "error",
        fillVariant: "full",
        class: "bg-red-500 hover:bg-red-600 text-neutral-50",
      },
      {
        variant: "error",
        fillVariant: "border",
        class: "border-red-500 bg-neutral-50 hover:bg-red-100 text-red-800",
      },
    ],
  },
);

type InternalButtonProps = React.ComponentProps<"button"> & {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fillVariant?: ButtonFillVariant;
  block?: boolean;
};

type ButtonComponent = ForwardRefExoticComponent<
  Omit<PropsWithClassName<InternalButtonProps>, "ref"> &
    RefAttributes<HTMLButtonElement>
> & {
  Icon: typeof IconButton;
};

export type ButtonProps = React.ComponentProps<ButtonComponent>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const Button: ButtonComponent = forwardRef<
  HTMLButtonElement,
  PropsWithClassName<InternalButtonProps>
>(
  (
    {
      className,
      block,
      size = "md",
      variant = "primary",
      fillVariant = "full",
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
          button({ variant, fillVariant, size }),
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
