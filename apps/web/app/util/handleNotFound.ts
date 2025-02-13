export function handleNotFound(item: object | number | null) {
  if (!item) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
}
