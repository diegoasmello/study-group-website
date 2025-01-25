type CardType = "flat" | "float";
type CardSize = "default" | "extended";

interface CardProps
  extends Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    "children"
  > {
  type: CardType;
  size?: CardSize;
  title: string;
  text: string;
  image?: string;
  actions?: JSX.Element;
  subtitle?: JSX.Element;
  titleMaxLines?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Card(props: CardProps) {
  const {
    type,
    size = "default",
    title,
    text,
    image,
    subtitle,
    actions,
    titleMaxLines,
  } = props;

  const sizeClass = sizeStyles[size];

  const hasTitleMaxLines =
    titleMaxLines !== null && titleMaxLines !== undefined;

  return (
    <div className={`bg-white rounded-3xl overflow-hidden ${typeStyles[type]}`}>
      {image && <img src={image} alt={title} className="w-full h-[236px]" />}
      <div className={`flex flex-col gap-4 p-8 pt-6 ${sizeClass.card}`}>
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
  float: "shadow-lg",
};
