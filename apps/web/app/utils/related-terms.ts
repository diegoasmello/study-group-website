import { QueryMode } from "~/graphql/generated";

export function getRelatedTerms(
  title: string | undefined,
  keywords: string | undefined,
): string[] {
  const splittedTitle =
    title?.split(" ")?.filter((word) => word.length > 4) ?? [];

  const splittedKeywords =
    keywords?.split(";")?.map((word) => word.trim()) ?? [];

  return [...splittedTitle, ...splittedKeywords];
}

export function getRelatedTermsWhereInput(terms: string[]) {
  return terms.map((term) => ({
    OR: [
      {
        title: {
          contains: term,
          mode: QueryMode.Insensitive,
        },
      },
      {
        keywords: {
          contains: term,
          mode: QueryMode.Insensitive,
        },
      },
    ],
  }));
}
