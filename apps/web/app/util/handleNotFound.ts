export function handleNotFound(item: object | null) {
  if (!item) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
}
