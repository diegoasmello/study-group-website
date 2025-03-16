import { client } from "~/lib/graphql-client";

export type PageMeta = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
};

interface Result<T> {
  data: T;
  meta: PageMeta;
}

export async function paginate<T, V>(
  query: string,
  pageInfo: { currentPage: number; perPage: number },
  variables?: Omit<V, "take" | "skip">,
): Promise<Result<T>> {
  const { perPage, currentPage } = pageInfo;
  const skip = currentPage > 0 ? perPage * (currentPage - 1) : 0;

  const { data, count: total } = await client.request<{
    data: T;
    count: number;
  }>(query, { ...variables, take: perPage, skip });

  const lastPage = Math.ceil(total / perPage);

  return {
    data: data,
    meta: {
      total,
      lastPage,
      currentPage,
      perPage,
      prev: currentPage > 1 ? currentPage - 1 : null,
      next: currentPage < lastPage ? currentPage + 1 : null,
    },
  };
}
