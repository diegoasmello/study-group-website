import { BaseItem, ImageData, ImageExtension } from "@keystone-6/core/types";
import { isEmpty, isObjAttrNull } from "../utils/checks";

type ItemImage = {
  image_id: string;
  image_filesize: number;
  image_width: number;
  image_height: number;
  image_extension: ImageExtension;
};

function imageRequired<Item = ItemImage>({
  item,
  resolvedData,
  addValidationError,
  extractItemImage = (item: Item) => ({
    id: item.image_id,
    filesize: item.image_filesize,
    width: item.image_width,
    height: item.image_height,
    extension: item.image_extension as ImageExtension,
  }),
  extractResolvedImage = (resolvedData) => resolvedData.image,
  errorMessage = "Image must not be null",
}: {
  item: BaseItem;
  resolvedData: Record<string, any>;
  addValidationError: (error: string) => void;
  extractItemImage?: (item: Item) => ImageData;
  extractResolvedImage?: (resolvedData) => ImageData;
  errorMessage?: string;
}) {
  const prevImage = !isEmpty(item) && extractItemImage(item as BaseItem & Item);
  const resolvedImage = extractResolvedImage(resolvedData);
  const hasPrevImage = !isEmpty(prevImage);
  const hasResolvedImage = !isEmpty(resolvedImage);
  const isDeletingImage = hasPrevImage && isObjAttrNull(resolvedImage);

  if ((!hasPrevImage && !hasResolvedImage) || isDeletingImage) {
    return addValidationError(errorMessage);
  }
}

export { imageRequired };
