import { Card, CardProps, CardSize } from "./Card";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";
import { IconCalendar, IconSignature } from "./icons";

interface CardPublicationProps
  extends Pick<React.ComponentProps<"div">, "className">,
    Pick<CardProps, "hideShadow"> {
  size: CardSize;
  publication: {
    title: string;
    description: string;
    author: string;
    date: Date;
  };
}

export function CardPublication(props: CardPublicationProps) {
  const { size, publication, hideShadow, className } = props;

  return (
    <Card
      className={className}
      size={size}
      title={publication.title}
      titleMaxLines={3}
      hideShadow={hideShadow}
      subtitle={
        size === "extended" ? (
          <div className="flex items-center gap-4 text-h5 text-gray-700 fill-gray-700">
            <div className="flex items-center gap-2">
              <IconCalendar className="size-4" />
              {publication.date.toLocaleDateString("pt-BR")}
            </div>
            <div className="flex items-center gap-2">
              <IconSignature className="size-4" />
              <span className="line-clamp-1">{publication.author}</span>
            </div>
          </div>
        ) : null
      }
      text={size === "default" ? publication.author : publication.description}
      actions={
        <nav className="flex items-center gap-2">
          <ButtonLink
            to={`/publications/1`}
            skin={size === "extended" ? "primary" : "ghost"}
            size="md"
          >
            Ver mais
          </ButtonLink>
          {size === "extended" && (
            <Button skin="ghost" size="md">
              Ler
            </Button>
          )}
        </nav>
      }
    />
  );
}
