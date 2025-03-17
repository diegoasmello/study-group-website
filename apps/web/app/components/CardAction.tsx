import { Card, CardProps, CardSize } from "./Card";
import { ButtonLink } from "./ButtonLink";
import { IconCalendar } from "./icons";

interface CardActionProps extends Pick<CardProps, "hideShadow" | "className"> {
  size: CardSize;
  action: {
    slug: string;
    title: string;
    image: string;
    date: Date;
  };
}

export function CardAction(props: CardActionProps) {
  const { action, size, hideShadow, className } = props;

  return (
    <Card
      size={size}
      title={action.title}
      image={action.image}
      hideShadow={hideShadow}
      className={className}
      label={
        <div className="flex items-center gap-2 text-h5 text-gray-700 fill-gray-700">
          <IconCalendar className="size-4" />
          {action.date.toLocaleDateString()}
        </div>
      }
      actions={
        <ButtonLink
          to={`/actions/${action.slug}`}
          skin={size === "extended" ? "primary" : "ghost"}
          size="md"
        >
          See more
        </ButtonLink>
      }
    />
  );
}
