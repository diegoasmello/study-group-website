import { MetaMatch, MetaMatches } from "@remix-run/react/dist/routeModules";
import { loader } from "~/root";

type RootMetaMatch = MetaMatch<string, typeof loader>;

export function getRootMatch(
  matches: MetaMatches<Record<string, unknown>>,
): RootMetaMatch {
  return matches.find((match) => match.id === "root") as RootMetaMatch;
}
