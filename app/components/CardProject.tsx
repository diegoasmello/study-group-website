import { Card, CardProps } from "./Card";
import { ButtonLink } from "./ButtonLink";

interface CardProjectProps extends Pick<CardProps, "hideShadow" | "type"> {
  project: {
    title: string;
    image: string;
    link: string;
  };
}

export function CardProject(props: CardProjectProps) {
  const { project, type = "float", hideShadow } = props;

  return (
    <Card
      title={project.title}
      image={project.image}
      imageAsIcon
      hideShadow={hideShadow}
      type={type}
      actions={
        <ButtonLink to={project.link} skin="ghost" size="md">
          Saiba mais
        </ButtonLink>
      }
    />
  );
}
