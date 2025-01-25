type ButtonSkin = "primary" | "outline" | "ghost";
type ButtonSize = "lg" | "md";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  skin?: ButtonSkin;
  size?: ButtonSize;
}

export function Button(props: Props) {
  const { skin = "primary", size = "lg", ...rest } = props;

  const skinClass = skinStyles[skin];
  const sizeClass = sizeStyles[size];

  return <button className={`${skinClass} ${sizeClass}`} {...rest} />;
}

const skinStyles: Record<ButtonSkin, string> = {
  primary: "bg-primary text-white",
  outline: "bg-white text-primary border border-primary",
  ghost: "",
};

const sizeStyles: Record<ButtonSize, string> = {
  lg: "px-8 py-4",
  md: "px-6 py-3",
};
