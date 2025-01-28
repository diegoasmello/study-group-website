import { Card, CardProps } from "./Card";
import { ButtonLink } from "./ButtonLink";

interface CardProjectProps extends Pick<CardProps, "hideShadow"> {
  project: {
    title: string;
    image: string;
    link: string;
  };
}

export function CardProject(props: CardProjectProps) {
  const { project, hideShadow } = props;

  return (
    <Card
      title={project.title}
      image={project.image}
      imageAsIcon
      hideShadow={hideShadow}
      actions={
        <ButtonLink to={project.link} skin="ghost" size="md">
          Saiba mais
        </ButtonLink>
      }
    />
  );
}
