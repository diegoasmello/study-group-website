import { MdArrowForward } from "react-icons/md";
import { Card, CardProps } from "./Card";
import { Link } from "./Link";

interface CardTeamMemberProps extends Pick<CardProps, "hideShadow" | "type"> {
  teamMember: {
    name: string;
    label: string;
    image: string;
    link: string;
  };
}

export function CardTeamMember(props: CardTeamMemberProps) {
  const { teamMember, type = "flat", hideShadow } = props;

  return (
    <Card
      type={type}
      title={teamMember.name}
      subtitle={<span className="text-gray-900">{teamMember.label}</span>}
      image={teamMember.image}
      imageAsIcon
      hideShadow={hideShadow}
      actions={
        <Link to={teamMember.link}>
          Lattes <MdArrowForward size={18} />
        </Link>
      }
    />
  );
}
