import { Link, LinkProps } from "@remix-run/react";
import { Button, ButtonProps } from "./Button";

interface ButtonLinkProps
  extends Pick<LinkProps, "to">,
    Omit<ButtonProps, "onClick"> {}

export function ButtonLink(props: ButtonLinkProps) {
  const { to, ...rest } = props;

  return (
    <Link to={to} tabIndex={-1}>
      <Button {...rest} />
    </Link>
  );
}
