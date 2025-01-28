import { Link } from "@remix-run/react";
import { Button } from "./Button";
import { Card, CardProps } from "./Card";

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
        <Link to={project.link}>
          <Button skin="ghost" size="md">
            Saiba mais
          </Button>
        </Link>
      }
    />
  );
}
