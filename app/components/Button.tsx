type ButtonSkin = "primary" | "outline" | "ghost";
type ButtonSize = "lg" | "md";

export interface ButtonProps extends React.ComponentProps<"button"> {
  skin?: ButtonSkin;
  size?: ButtonSize;
}

export function Button(props: ButtonProps) {
  const { skin = "primary", size = "lg", className, ...rest } = props;

  return (
    <button
      className={`${className} transition inline-flex items-center justify-center rounded-xl font-medium focus:shadow-focus focus:outline-none ${skinClasses[skin]} ${sizeClasses[size]} }`}
      {...rest}
    />
  );
}

const skinClasses: Record<ButtonSkin, string> = {
  primary:
    "bg-primary text-white fill-white hover:bg-primary-dark active:bg-primary-dark",
  outline:
    "bg-transparent text-primary fill-primary border border-primary hover:bg-primary hover:text-white active:bg-primary-darker active:text-white",
  ghost:
    "bg-primary-lighter text-primary fill-primary hover:bg-primary-200 active:bg-primary-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "h-[52px] px-8",
  md: "h-[44px] px-6",
};
