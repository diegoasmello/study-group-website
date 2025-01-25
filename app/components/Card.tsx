type CardType = "flat" | "float";
type CardSize = "default" | "extended";

interface CardProps extends Omit<React.ComponentProps<"div">, "children"> {
  type?: CardType;
  size?: CardSize;
  title: string;
  text: string;
  image?: string;
  icon?: string;
  actions?: JSX.Element;
  subtitle?: JSX.Element;
  titleMaxLines?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Card(props: CardProps) {
  const {
    type = "float",
    size = "default",
    title,
    text,
    image,
    icon,
    subtitle,
    actions,
    titleMaxLines,
  } = props;

  const sizeClass = sizeStyles[size];

  const hasTitleMaxLines =
    titleMaxLines !== null && titleMaxLines !== undefined;

  return (
    <CardContainer type={type}>
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-[236px] object-cover"
        />
      )}
      <div className={`flex flex-col gap-4 p-8 pt-6 ${sizeClass.card}`}>
        {icon && (
          <div className="w-[120px] h-[120px] bg-primary-lighter flex items-center justify-center rounded-3xl">
            {icon}
          </div>
        )}
        <span
          className={`text-h4 text-gray-950 font-medium ${sizeClass.title} ${
            hasTitleMaxLines ? `line-clamp-${titleMaxLines}` : ""
          }`}
        >
          {title}
        </span>
        {subtitle}
        <span className={`text-gray-700 ${sizeClass.text}`}>{text}</span>
        {actions}
      </div>
    </CardContainer>
  );
}

export function CardContainer({
  type = "float",
  children,
}: Pick<CardProps, "type"> & React.ComponentProps<"div">) {
  return (
    <div className={`bg-white rounded-3xl overflow-hidden ${typeStyles[type]}`}>
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
