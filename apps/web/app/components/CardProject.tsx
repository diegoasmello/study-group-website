import { Card, CardProps } from "./Card";
import { ButtonLink } from "./ButtonLink";

interface CardProjectProps
  extends Pick<CardProps, "hideShadow" | "type" | "className"> {
  project: {
    slug: string;
    title: string;
    image: string;
  };
}

export function CardProject(props: CardProjectProps) {
  const { project, type = "float", hideShadow, className } = props;

  return (
    <Card
      title={project.title}
      image={project.image}
      imageAsIcon
      hideShadow={hideShadow}
      type={type}
      className={className}
      actions={
        <ButtonLink to={`/projects/${project.slug}`} skin="ghost" size="md">
          See more
        </ButtonLink>
      }
    />
  );
}
