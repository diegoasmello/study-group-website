import { Card, CardProps, CardSize } from "./Card";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";
import { IconCalendar, IconSignature } from "./icons";
import { listFormat } from "~/util";

interface CardPublicationProps
  extends Pick<React.ComponentProps<"div">, "className">,
    Pick<CardProps, "hideShadow"> {
  size: CardSize;
  hideText?: boolean;
  publication: {
    slug: string;
    title: string;
    description: string;
    date: Date;
    researchers: {
      id: number;
      name: string;
    }[];
  };
}

export function CardPublication(props: CardPublicationProps) {
  const { size, publication, hideShadow, hideText, className } = props;

  const researchersText = listFormat(
    publication?.researchers?.map((research) => research.name) ?? []
  );

  return (
    <Card
      className={className}
      size={size}
      title={publication.title}
      titleMaxLines={3}
      hideShadow={hideShadow}
      grow="text"
      subtitle={
        size === "extended" ? (
          <div className="flex items-center gap-4 text-h5 text-gray-700 fill-gray-700">
            <div className="flex items-center gap-2">
              <IconCalendar className="size-4" />
              {publication.date.toLocaleDateString()}
            </div>
            {publication.researchers?.length && (
              <div className="flex items-center gap-2">
                <IconSignature className="size-4" />
                <span className="line-clamp-1">{researchersText}</span>
              </div>
            )}
          </div>
        ) : null
      }
      text={
        !hideText
          ? size === "default"
            ? researchersText
            : publication.description
          : null
      }
      actions={
        <nav className="flex items-center gap-2">
          <ButtonLink
            to={`/publications/${publication.slug}`}
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
