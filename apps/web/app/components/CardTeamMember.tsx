import { useTranslation } from "react-i18next";
import { Card, CardProps } from "./Card";
import { IconArrowForward } from "./icons";
import { ExternalLink } from "./Link";

interface CardTeamMemberProps extends Pick<CardProps, "hideShadow" | "type"> {
  teamMember: {
    name: string;
    role: string;
    image: string;
    link: string;
  };
}

export function CardTeamMember(props: CardTeamMemberProps) {
  const { teamMember, type = "flat", hideShadow } = props;

  const { t } = useTranslation();

  return (
    <Card
      type={type}
      title={teamMember.name}
      subtitle={<span className="text-gray-900">{teamMember.role}</span>}
      image={teamMember.image}
      imageAsIcon
      hideShadow={hideShadow}
      actions={
        <ExternalLink to={teamMember.link}>
          {t("CardTeamMember.linkLabel")}{" "}
          <IconArrowForward className="size-5" />
        </ExternalLink>
      }
    />
  );
}
