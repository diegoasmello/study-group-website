export type CardType = "flat" | "float";
export type CardSize = "default" | "extended";

interface CardProps extends Omit<React.ComponentProps<"div">, "children"> {
  type?: CardType;
  size?: CardSize;
  title: string;
  text?: string;
  image?: string;
  icon?: JSX.Element | string;
  imageAsIcon?: boolean;
  actions?: JSX.Element | null;
  subtitle?: JSX.Element | null;
  label?: JSX.Element | null;
  titleMaxLines?: 1 | 2 | 3 | 4 | 5 | 6;
  hideShadow?: boolean;
}

export function Card(props: CardProps) {
  const {
    type = "float",
    size = "default",
    title,
    text,
    image,
    icon,
    imageAsIcon,
    subtitle,
    label,
    actions,
    titleMaxLines,
    className,
    hideShadow,
  } = props;

  const sizeClass = sizeStyles[size];

  const hasTitleMaxLines =
    titleMaxLines !== null && titleMaxLines !== undefined;

  return (
    <CardContainer type={type} hideShadow={hideShadow} className={className}>
      {image && !imageAsIcon && (
        <img
          src={image}
          alt={title}
          className="w-full h-[236px] object-cover"
        />
      )}
      <div className={`flex flex-col gap-4 p-6 ${sizeClass.card}`}>
        {icon && (
          <div className="w-[120px] h-[120px] bg-primary-lighter flex items-center justify-center rounded-3xl">
            {icon}
          </div>
        )}
        {image && imageAsIcon && (
          <img
            src={image}
            alt={title}
            className="w-[120px] h-[120px] rounded-3xl object-cover"
          />
        )}
        {label}
        <span
          className={`text-h4 text-gray-950 font-medium ${sizeClass.title} ${
            hasTitleMaxLines ? `line-clamp-${titleMaxLines}` : ""
          }`}
        >
          {title}
        </span>
        {subtitle}
        {text && (
          <span className={`text-gray-700 ${sizeClass.text}`}>{text}</span>
        )}
        {actions}
      </div>
    </CardContainer>
  );
}

export function CardContainer({
  type = "float",
  hideShadow,
  children,
  className,
}: Pick<CardProps, "type" | "hideShadow"> & React.ComponentProps<"div">) {
  return (
    <div
      className={`${className ?? ""} bg-white rounded-3xl overflow-hidden ${
        !hideShadow ? typeStyles[type] : ""
      }`}
    >
      {children}
    </div>
  );
}

const sizeStyles: Record<
  CardSize,
  { card: string; title: string; text: string }
> = {
  default: {
    card: "items-center",
    title: "text-center",
    text: "text-center",
  },
  extended: {
    card: "items-start",
    title: "text-left",
    text: "text-left",
  },
};

const typeStyles: Record<CardType, string> = {
  flat: "border border-gray-300",
  float: "shadow-custom-1",
};
