import React, {
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

import { Icon, type IconProps } from "./icon";

export type ButtonVariant = "primary" | "secondary" | "error" | "warning";
export type ButtonFillVariant = "border" | "full";
export type ButtonSize = "md" | "lg";

const button = cva(
  "whitespace-nowrap outline-none focus:ring-2 focus:ring-offset-2 border-[1px]",
  {
    variants: {
      variant: {
        primary: "focus:ring-violet-500 focus:ring-offset-neutral-50",
        secondary:
          "border-neutral-400 bg-neutral-50 hover:bg-neutral-200 text-neutral-800 focus:ring-neutral-800 focus:ring-offset-neutral-50",
        warning: "focus:ring-amber-500 focus:ring-offset-neutral-50",
        error: "focus:ring-red-500 focus:ring-offset-neutral-50",
      },
      fillVariant: {
        border: "bg-neutral-50",
        full: "text-neutral-50",
      },
      size: {
        md: "text-xs px-8 py-2 rounded font-semibold",
        lg: "text-sm px-8 py-3 rounded font-semibold",
      },
      disabled: {
        true: "cursor-not-allowed",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "primary",
        fillVariant: "full",
        disabled: false,
        class: "bg-violet-500 hover:bg-violet-500",
      },
      {
        variant: "primary",
        fillVariant: "full",
        disabled: true,
        class: "bg-violet-300 hover:bg-violet-300",
      },
      {
        variant: "primary",
        fillVariant: "border",
        disabled: false,
        class: "border-violet-500 hover:bg-violet-100 text-violet-800",
      },
      {
        variant: "primary",
        fillVariant: "border",
        disabled: true,
        class: "border-violet-300 hover:border-violet-300 text-violet-400",
      },
      {
        variant: "error",
        fillVariant: "full",
        class: "bg-red-500 hover:bg-red-600 text-neutral-50",
      },
      {
        variant: "error",
        fillVariant: "border",
        disabled: false,
        class: "border-red-500 hover:bg-red-100 text-red-800",
      },
      {
        variant: "error",
        fillVariant: "border",
        disabled: true,
        class: "border-red-300 hover:border-red-300 text-red-300",
      },
      {
        variant: "warning",
        fillVariant: "full",
        disabled: false,
        class: "bg-amber-500 hover:bg-amber-600 text-neutral-50",
      },
      {
        variant: "warning",
        fillVariant: "full",
        disabled: true,
        class: "bg-amber-300 hover:bg-amber-300",
      },
      {
        variant: "warning",
        fillVariant: "border",
        disabled: false,
        class: "border-amber-500 hover:bg-amber-100 text-amber-600",
      },
      {
        variant: "warning",
        fillVariant: "border",
        disabled: true,
        class: "border-amber-300 hover:border-amber-300 text-amber-400",
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
      disabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        {...props}
        type={type}
        ref={ref}
        disabled={disabled}
        className={clsx(
          block && "w-full",
          button({ variant, fillVariant, size, disabled }),
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
