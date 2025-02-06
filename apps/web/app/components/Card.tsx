import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export type CardType = "flat" | "float";
export type CardSize = "default" | "extended";

export interface CardProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  type?: CardType;
  size?: CardSize;
  title: string;
  text?: string | null;
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
    // titleMaxLines,
    className,
    hideShadow,
  } = props;

  const sizeClass = sizeStyles[size];

  // const hasTitleMaxLines =
  //   titleMaxLines !== null && titleMaxLines !== undefined;

  return (
    <CardContainer type={type} hideShadow={hideShadow} className={className}>
      {image && !imageAsIcon && (
        <img
          src={image}
          alt={title}
          className="w-full h-[15rem] object-cover"
        />
      )}
      <div className={twMerge("flex flex-col gap-4 p-6", sizeClass.card)}>
        {icon && (
          <div className="size-[7.5rem] bg-primary-lighter flex items-center justify-center rounded-3xl">
            {icon}
          </div>
        )}
        {image && imageAsIcon && (
          <img
            src={image}
            alt={title}
            className="size-[7.5rem] rounded-3xl object-cover"
          />
        )}
        {label}
        <div
          className={clsx(
            "text-h4 text-gray-950 font-medium line-clamp-3",
            sizeClass.title
          )}
        >
          {title}
        </div>
        {subtitle}
        {text && (
          <span className={twMerge("text-gray-700", sizeClass.text)}>
            {text}
          </span>
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
      className={twMerge(
        clsx(
          "w-full bg-white rounded-3xl overflow-hidden",
          !hideShadow && typeStyles[type],
          className
        )
      )}
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
