import { MdOutlineCalendarMonth } from "react-icons/md";
import { Card, CardProps, CardSize } from "./Card";
import { ButtonLink } from "./ButtonLink";

interface CardActionProps extends Pick<CardProps, "hideShadow"> {
  size: CardSize;
  action: {
    title: string;
    image: string;
    date: Date;
  };
}

export function CardAction(props: CardActionProps) {
  const { action, size, hideShadow } = props;

  return (
    <Card
      size={size}
      title={action.title}
      titleMaxLines={3}
      image={action.image}
      hideShadow={hideShadow}
      label={
        <div className="flex items-center gap-2 text-h5 text-gray-700 fill-gray-700">
          <MdOutlineCalendarMonth size={16} />
          {action.date.toLocaleDateString("pt-BR")}
        </div>
      }
      actions={
        <ButtonLink
          to={`/actions/1`}
          skin={size === "extended" ? "primary" : "ghost"}
          size="md"
        >
          Saiba mais
        </ButtonLink>
      }
    />
  );
}
