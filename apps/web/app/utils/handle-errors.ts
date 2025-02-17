export function handleNotFound(
  ...items: (object | number | string | boolean | null | undefined)[]
) {
  if (items.every((item) => !item)) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
}
