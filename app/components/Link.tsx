import {
  LinkProps as RemixLinkProps,
  Link as RemixLink,
} from "@remix-run/react";
import {} from "@remix-run/react/dist/components";

interface LinkProps extends RemixLinkProps {}

export function Link(props: LinkProps) {
  const { className, ...rest } = props;

  return (
    <RemixLink
      className={`${className} flex items-center gap-1 underline text-primary fill-primary-100 hover:text-primary-dark hover:fill-primary-dark active:text-primary-darker active:fill-primary-darker focus:outline-none focus:border focus:border-primary`}
      {...rest}
    />
  );
}
