import { Card, CardProps } from "./Card";
import { ButtonLink } from "./ButtonLink";
import { useTranslation } from "react-i18next";

interface CardProjectProps
  extends Pick<CardProps, "hideShadow" | "type" | "className" | "size"> {
  project: {
    slug: string;
    title: string;
    image: string;
  };
}

export function CardProject(props: CardProjectProps) {
  const {
    project,
    size = "default",
    type = "float",
    hideShadow,
    className,
  } = props;

  const { t } = useTranslation();

  return (
    <Card
      title={project.title}
      image={project.image}
      imageAsIcon={size === "default"}
      hideShadow={hideShadow}
      type={type}
      className={className}
      size={size}
      actions={
        <ButtonLink to={`/projects/${project.slug}`} skin="ghost" size="md">
          {t("CardProject.primaryButtonLabel")}
        </ButtonLink>
      }
    />
  );
}
