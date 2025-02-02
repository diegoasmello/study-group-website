import {
  LinkProps as RemixLinkProps,
  Link as RemixLink,
} from "@remix-run/react";
import {} from "@remix-run/react/dist/components";
import { twMerge } from "tailwind-merge";

interface LinkProps extends RemixLinkProps {}

export function Link(props: LinkProps) {
  const { className, ...rest } = props;

  return (
    <RemixLink
      className={twMerge(
        "flex items-center gap-1 rounded-lg underline text-primary fill-primary-100 hover:text-primary-dark hover:fill-primary-dark active:text-primary-darker active:fill-primary-darker focus:outline-none focus:shadow-focus",
        className
      )}
      {...rest}
    />
  );
}
