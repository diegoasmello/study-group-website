import { Link, LinkProps } from "@remix-run/react";
import { Button, ButtonProps } from "./Button";
import { ExternalLink } from "./Link";

interface ButtonLinkProps
  extends Pick<LinkProps, "to" | "prefetch">,
    Omit<ButtonProps, "onClick"> {
  external?: boolean;
}

export function ButtonLink(props: ButtonLinkProps) {
  const { to, external, prefetch = "intent", ...rest } = props;

  if (external && typeof to === "string") {
    return (
      <ExternalLink to={to} tabIndex={-1} className="no-underline">
        <Button {...rest} />
      </ExternalLink>
    );
  }

  return (
    <Link to={to} tabIndex={-1} prefetch={prefetch}>
      <Button {...rest} />
    </Link>
  );
}
