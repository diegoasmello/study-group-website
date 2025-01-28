import { MdOutlineCalendarMonth, MdSignLanguage } from "react-icons/md";
import { Card, CardProps, CardSize } from "./Card";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

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
              <MdOutlineCalendarMonth size={16} />
              {publication.date.toLocaleDateString("pt-BR")}
            </div>
            <div className="flex items-center gap-2">
              <MdSignLanguage size={16} />
              {publication.author}
            </div>
          </div>
        ) : null
      }
      text={size === "default" ? publication.author : publication.description}
      actions={
        size === "extended" ? (
          <nav className="flex items-center gap-2">
            <ButtonLink to={`/publications/1`} skin="primary" size="md">
              Ver mais
            </ButtonLink>
            <Button skin="ghost" size="md">
              Ler
            </Button>
          </nav>
        ) : (
          <ButtonLink to={`/publications/1`} skin="ghost" size="md">
            Ver mais
          </ButtonLink>
        )
      }
    />
  );
}
