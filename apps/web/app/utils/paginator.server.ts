import { client } from "~/lib/graphql-client.server";

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

type Response<ReturnType> = { data: ReturnType; count: number };

export async function paginate<ReturnType, Variables, ResponseType = object>({
  query,
  pageInfo,
  variables,
  extract,
}: {
  query: string;
  pageInfo: { currentPage: number; perPage: number };
  variables?: Omit<Variables, "take" | "skip">;
  extract?: (response: ResponseType) => { data: ReturnType; count: number };
}): Promise<Result<ReturnType>> {
  const { perPage, currentPage } = pageInfo;
  const skip = currentPage > 0 ? perPage * (currentPage - 1) : 0;

  const response = await client.request<ResponseType & Response<ReturnType>>(
    query,
    { ...variables, take: perPage, skip },
  );

  const { data, count } = extract?.(response) ?? response;

  const lastPage = Math.ceil(count / perPage);

  return {
    data: data,
    meta: {
      total: count,
      lastPage,
      currentPage,
      perPage,
      prev: currentPage > 1 ? currentPage - 1 : null,
      next: currentPage < lastPage ? currentPage + 1 : null,
    },
  };
}
