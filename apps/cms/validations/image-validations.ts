import { BaseItem } from "@keystone-6/core/types";
import { isEmpty, isObjAttrNull } from "../utils/checks";

type ItemImage = {
  image_id: string;
  image_filesize: number;
  image_width: number;
  image_height: number;
  image_extension: string;
};

function createImageObj(item: ItemImage): {
  id: string;
  filesize: number;
  width: number;
  height: number;
  extension: string;
} {
  if (item === undefined || item === null) return undefined;

  const {
    image_id,
    image_filesize,
    image_width,
    image_height,
    image_extension,
  } = item;

  return {
    id: image_id,
    filesize: image_filesize,
    width: image_width,
    height: image_height,
    extension: image_extension,
  };
}

function imageRequired(
  item: BaseItem,
  resolvedData: Record<string, any>,
  addValidationError: (error: string) => void,
  errorMessage: string = "Image must not be null",
) {
  const prevImage = createImageObj(item as BaseItem & ItemImage);
  const resolvedImage = resolvedData?.image;
  const hasPrevImage = !isEmpty(prevImage);
  const hasResolvedImage = !isEmpty(resolvedImage);
  const isDeletingImage = hasResolvedImage && isObjAttrNull(resolvedImage);

  if ((!hasPrevImage && !hasResolvedImage) || isDeletingImage) {
    return addValidationError(errorMessage);
  }
}

export { imageRequired };
