export function listFormat(arr: string[]) {
  const formatter = new Intl.ListFormat(undefined, {
    style: "long",
    type: "conjunction",
  });
  return formatter.format(arr);
}
