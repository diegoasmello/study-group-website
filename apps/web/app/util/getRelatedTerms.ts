export function getRelatedTerms(
  title: string | undefined,
  keywords: string | undefined
): { terms: string[] } {
  const splittedTitle =
    title?.split(" ")?.filter((word) => word.length > 4) ?? [];
  const splittedKeywords =
    keywords?.split(";")?.map((word) => word.trim()) ?? [];
  return { terms: [...splittedTitle, ...splittedKeywords] };
}
