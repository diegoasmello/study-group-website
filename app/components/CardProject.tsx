import { Link } from "@remix-run/react";
import { Button } from "./Button";
import { Card } from "./Card";

interface CardProjectProps {
  project: {
    title: string;
    image: string;
    link: string;
  };
}

export function CardProject(props: CardProjectProps) {
  const { project } = props;

  return (
    <Card
      title={project.title}
      image={project.image}
      imageAsIcon
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
