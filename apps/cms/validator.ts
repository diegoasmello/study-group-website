function isEmpty(obj: object) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function imageRequired(
  image: object,
  addValidationError: (error: string) => void,
  errorMessage: string = "Image must not be null",
) {
  console.log(
    "isEmpty",
    Object.values(image).every((attr) => attr === null || attr === undefined),
  );
  if (
    Object.values(image).every((attr) => attr === null || attr === undefined)
  ) {
    return addValidationError(errorMessage);
  }
}
