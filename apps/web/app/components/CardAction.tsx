import { Card, CardProps, CardSize } from "./Card";
import { ButtonLink } from "./ButtonLink";
import { IconCalendar } from "./icons";
import { useTranslation } from "react-i18next";
import { useLocale } from "~/hooks/use-locale";

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

  const locale = useLocale();
  const { t } = useTranslation();

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
          {action.date.toLocaleDateString(locale)}
        </div>
      }
      actions={
        <ButtonLink
          to={`/actions/${action.slug}`}
          skin={size === "extended" ? "primary" : "ghost"}
          size="md"
        >
          {t("CardAction.primaryButtonLabel")}
        </ButtonLink>
      }
    />
  );
}
