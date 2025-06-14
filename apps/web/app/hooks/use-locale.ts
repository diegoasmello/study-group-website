import { useMatches } from "@remix-run/react";

export function useLocale(localeKey = "locale"): string {
  const matches = useMatches();
  const rootMatch = matches[0]!;
  const { [localeKey]: locale } =
    (rootMatch.data as Record<string, string>) ?? {};
  if (!locale) throw new Error("Missing locale returned by the root loader.");
  if (typeof locale === "string") return locale;
  throw new Error("Invalid locale returned by the root loader.");
}
