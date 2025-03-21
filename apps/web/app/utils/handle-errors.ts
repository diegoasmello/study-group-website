export function handleNotFound(
  ...items: (object | number | string | boolean | null | undefined)[]
) {
  if (items.every((item) => !item)) {
    throw new Response(null, {
      status: 404,
      statusText: "Page not found",
    });
  }
}

export function checkPageNotFound({
  page,
  lastPage,
}: {
  page: number;
  lastPage: number;
}) {
  if (page > lastPage && lastPage > 0) {
    return handleNotFound(false);
  }
}
