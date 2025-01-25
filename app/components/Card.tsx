type CardType = "flat" | "float";
type CardSize = "default" | "extended";

interface Props
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
  actions?: JSX.Element;
  subtitle?: JSX.Element;
  titleMaxLines?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Card(props: Props) {
  const {
    /* type, */
    size = "default",
    title,
    text,
    subtitle,
    actions,
    titleMaxLines,
  } = props;

  const sizeClass = sizeStyles[size];

  const hasTitleMaxLines =
    titleMaxLines !== null && titleMaxLines !== undefined;

  return (
    <div
      className={`flex flex-col gap-4 p-8 pt-6 rounded-3xl shadow-lg ${sizeClass.card}`}
    >
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
