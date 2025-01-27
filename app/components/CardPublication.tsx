import { MdOutlineCalendarMonth, MdSignLanguage } from "react-icons/md";
import { Card, CardSize } from "./Card";
import { Button } from "./Button";
import { Link } from "@remix-run/react";

interface CardPublicationProps
  extends Pick<React.ComponentProps<"div">, "className"> {
  size: CardSize;
  publication: {
    title: string;
    description: string;
    author: string;
    date: Date;
  };
}

export function CardPublication(props: CardPublicationProps) {
  const { size, publication, className } = props;

  return (
    <Card
      className={className}
      size={size}
      title={publication.title}
      titleMaxLines={3}
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
            <Link to={`/publications/1`}>
              <Button skin="primary" size="md">
                Ver mais
              </Button>
            </Link>
            <Button skin="ghost" size="md">
              Ler
            </Button>
          </nav>
        ) : (
          <Link to={`/publications/1`}>
            <Button skin="ghost" size="md">
              Ver mais
            </Button>
          </Link>
        )
      }
    />
  );
}
