type ButtonSkin = "primary" | "outline" | "ghost";
type ButtonSize = "lg" | "md";

interface ButtonProps extends React.ComponentProps<"button"> {
  skin?: ButtonSkin;
  size?: ButtonSize;
}

export function Button(props: ButtonProps) {
  const { skin = "primary", size = "lg", ...rest } = props;

  return (
    <button
      className={`transition inline-flex items-center justify-center rounded-xl font-medium focus:shadow-focus focus:outline-none ${skinClasses[skin]} ${sizeClasses[size]}`}
      {...rest}
    />
  );
}

const skinClasses: Record<ButtonSkin, string> = {
  primary: "bg-primary text-white hover:bg-primary-dark active:bg-primary-dark",
  outline:
    "bg-transparent text-primary border border-primary hover:bg-primary hover:text-white active:bg-primary-darker active:text-white",
  ghost:
    "bg-primary-lighter text-primary hover:bg-primary-200 active:bg-primary-300",
};

const sizeClasses: Record<ButtonSize, string> = {
  lg: "px-8 py-4",
  md: "px-6 py-3",
};
