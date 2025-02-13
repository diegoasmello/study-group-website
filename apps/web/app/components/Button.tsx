import clsx from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonSkin = "primary" | "outline" | "ghost";
type ButtonSize = "lg" | "md";

export interface ButtonProps extends React.ComponentProps<"button"> {
  skin?: ButtonSkin;
  size?: ButtonSize;
  hasIcon?: boolean;
}

export const Button = forwardRef(
  (props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const {
      skin = "primary",
      size = "lg",
      className,
      hasIcon,
      ...rest
    } = props;

    return (
      <button
        className={twMerge(
          clsx(
            "cursor-pointer transition inline-flex items-center justify-center rounded-xl font-medium focus:shadow-focus focus:outline-hidden",
            skinClasses[skin],
            sizeClasses[size],
            hasIcon && "gap-2 px-3",
            className,
          ),
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);

Button.displayName = "Button";

const skinClasses: Record<ButtonSkin, string> = {
  primary:
    "bg-primary text-white fill-white hover:bg-primary-dark active:bg-primary-dark disabled:bg-primary-lighter disabled:text-primary-400",
  outline:
    "bg-transparent text-primary fill-primary border border-primary hover:bg-primary hover:text-white active:bg-primary-darker active:text-white disabled:border-primary-200 disabled:text-primary-200 disabled:bg-transparent",
  ghost:
    "bg-primary-lighter text-primary fill-primary hover:bg-primary-200 active:bg-primary-300 disabled:text-primary-400 disabled:bg-primary-lighter",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "h-[3.25rem] px-8",
  md: "h-[2.75rem] px-6",
};
