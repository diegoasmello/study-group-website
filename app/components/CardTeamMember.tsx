import { MdArrowForward } from "react-icons/md";
import { Card } from "./Card";
import { Link } from "./Link";

interface CardTeamMemberProps {
  teamMember: {
    name: string;
    label: string;
    image: string;
    link: string;
  };
}

export function CardTeamMember(props: CardTeamMemberProps) {
  const { teamMember } = props;

  return (
    <Card
      type="flat"
      title={teamMember.name}
      subtitle={<span className="text-gray-900">{teamMember.label}</span>}
      image={teamMember.image}
      imageAsIcon
      actions={
        <Link to={teamMember.link}>
          Lattes <MdArrowForward size={18} />
        </Link>
      }
    />
  );
}
