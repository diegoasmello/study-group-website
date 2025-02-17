import { MetaDescriptor } from "@remix-run/node";

export function metaTags({
  title,
  description,
  url,
  pathname,
  image,
  ogType = "article",
  twitterCard = "summary_large_image",
}: {
  title: string | undefined;
  description: string | undefined;
  url: string | undefined;
  pathname: string;
  image?: string;
  ogType?: "article";
  twitterCard?: "summary_large_image";
}): MetaDescriptor[] {
  const titleTags: MetaDescriptor[] = title
    ? [
        { title: title },
        { property: "og:title", content: title },
        { property: "twitter:title", content: title },
      ]
    : [];
  const descriptionTags: MetaDescriptor[] = description
    ? [
        { name: "description", content: description },
        { property: "og:description", content: description },
        { property: "twitter:description", content: description },
      ]
    : [];
  const imageTags: MetaDescriptor[] = image
    ? [
        { property: "og:image", content: image },
        { property: "twitter:image", content: image },
      ]
    : [];
  const twitterCardTags: MetaDescriptor[] = twitterCard
    ? [{ property: "twitter:card", content: twitterCard }]
    : [];
  const ogTypeTags: MetaDescriptor[] = ogType
    ? [{ property: "og:type", content: ogType }]
    : [];

  return [
    ...titleTags,
    ...descriptionTags,
    ...ogTypeTags,
    ...twitterCardTags,
    ...imageTags,
    { property: "og:url", content: url },
    { property: "twitter:url", content: url },
    { property: "twitter:domain", content: url?.split(pathname)[0] },
  ];
}
