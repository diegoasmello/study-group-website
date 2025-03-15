import { isEmpty } from "lodash";

export function imageRequired(
  image: object,
  addValidationError: (error: string) => void,
  errorMessage: string = "Image must not be null",
) {
  if (Object.values(image).every((attr) => attr === null || attr === undefined))
    return addValidationError(errorMessage);
}

export function documentRequired(
  document: any,
  addValidationError: (error: string) => void,
  errorMessage: string = "Content must not be null",
) {
  if (isEmpty(document) || isEmpty(document[0].children[0].text))
    return addValidationError(errorMessage);
}
