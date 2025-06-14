import { Card, CardProps, CardSize } from "./Card";
import { ButtonLink } from "./ButtonLink";
import { IconCalendar, IconSignature } from "./icons";
import { listFormat } from "~/utils";
import { useTranslation } from "react-i18next";
import { useLocale } from "~/hooks/use-locale";

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
    link: string;
    researchers: {
      id: string;
      name: string;
    }[];
  };
}

export function CardPublication(props: CardPublicationProps) {
  const { size, publication, hideShadow, hideText, className } = props;

  const locale = useLocale();
  const { t } = useTranslation();

  const researchersText = listFormat(
    publication?.researchers?.map((research) => research.name) ?? [],
  );

  return (
    <Card
      className={className}
      size={size}
      title={publication.title}
      hideShadow={hideShadow}
      grow="text"
      subtitle={
        size === "extended" ? (
          <div className="flex items-center gap-4 text-h5 text-gray-700 fill-gray-700">
            <div className="flex items-center gap-2">
              <IconCalendar className="size-4" />
              {publication.date.toLocaleDateString(locale)}
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
            {t("CardPublication.primaryButtonLabel")}
          </ButtonLink>
          {size === "extended" && (
            <ButtonLink skin="ghost" size="md" to={publication.link} external>
              {t("CardPublication.secondaryButtonLabel")}
            </ButtonLink>
          )}
        </nav>
      }
    />
  );
}
