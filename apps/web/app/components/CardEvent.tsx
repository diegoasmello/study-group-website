import { Card, CardProps, CardSize } from "./Card";
import { ButtonLink } from "./ButtonLink";
import { IconCalendar, IconLocation } from "./icons";

interface CardEventProps extends Pick<CardProps, "hideShadow" | "className"> {
  size: CardSize;
  event: {
    slug: string;
    title: string;
    image: string;
    date: Date;
    locale: string;
    link?: string;
  };
  hideLocale?: boolean;
}

export function CardEvent(props: CardEventProps) {
  const { event, size, hideLocale, hideShadow, className } = props;

  const hasInscricao = event.date.getTime() > Date.now();

  return (
    <Card
      size={size}
      title={event.title}
      titleMaxLines={3}
      image={event.image}
      hideShadow={hideShadow}
      className={className}
      label={
        <div className="flex items-center gap-4 text-h5 text-gray-700 fill-gray-700">
          <div className="flex items-center gap-2">
            <IconCalendar className="size-4" />
            {event.date.toLocaleDateString()}
          </div>
          {!hideLocale && (
            <div className="flex items-center gap-2">
              <IconLocation className="size-4" />
              {event.locale}
            </div>
          )}
        </div>
      }
      actions={
        <nav className="flex items-center gap-2">
          <ButtonLink
            to={`/events/${event.slug}`}
            skin={hasInscricao ? "primary" : "ghost"}
            size="md"
          >
            Saiba mais
          </ButtonLink>
          {hasInscricao && (
            <ButtonLink skin="ghost" size="md" to={event.link}>
              Inscrever-se
            </ButtonLink>
          )}
        </nav>
      }
    />
  );
}
