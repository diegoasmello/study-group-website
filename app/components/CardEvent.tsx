import { Card, CardProps, CardSize } from "./Card";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";
import { IconCalendar, IconLocation } from "./icons";

interface CardEventProps extends Pick<CardProps, "hideShadow"> {
  size: CardSize;
  event: {
    title: string;
    image: string;
    date: Date;
    locale: string;
  };
  hideLocale?: boolean;
}

export function CardEvent(props: CardEventProps) {
  const { event, size, hideLocale, hideShadow } = props;

  const hasInscricao = true;

  return (
    <Card
      size={size}
      title={event.title}
      titleMaxLines={3}
      image={event.image}
      hideShadow={hideShadow}
      label={
        <div className="flex items-center gap-4 text-h5 text-gray-700 fill-gray-700">
          <div className="flex items-center gap-2">
            <IconCalendar width={16} height={16} />
            {event.date.toLocaleDateString("pt-BR")}
          </div>
          {!hideLocale && (
            <div className="flex items-center gap-2">
              <IconLocation width={16} height={16} />
              {event.date.toLocaleDateString("pt-BR")}
            </div>
          )}
        </div>
      }
      actions={
        <nav className="flex items-center gap-2">
          <ButtonLink
            to={`/events/1`}
            skin={hasInscricao ? "primary" : "ghost"}
            size="md"
          >
            Saiba mais
          </ButtonLink>
          <Button skin="ghost" size="md">
            Inscrever-se
          </Button>
        </nav>
      }
    />
  );
}
