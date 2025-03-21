import { BaseItem } from "@keystone-6/core/types";
import { isEmpty, isEmptyArray } from "../utils/checks";

function isBlockTextEmpty(block: object & { text: string }) {
  const text = block.text;
  return isEmpty(text) || text === "";
}

function isBlockParagraphEmpty(
  block: object & { children: Array<{ text: string }> },
) {
  const text = block.children[0].text;
  return isEmpty(text) || text === "";
}

function isBlockListItemEmpty(
  block: object & { children: Array<{ children: Array<{ text: string }> }> },
) {
  const text = block.children[0].children[0].text;
  return isEmpty(text) || text === "";
}

function isBlockLayoutAreaEmpty(
  blocks: Array<{
    children: Array<{ children: Array<{ text: string }> }>;
  }>,
) {
  return isEmptyArray(
    blocks.map((children) => children.children[0].children[0].text),
  );
}

function isDocumentEmpty(document: any) {
  if (document === undefined || document === null) return true;

  let block;

  if (Array.isArray(document)) {
    block = document[0];
  } else {
    block = document;
  }

  const firstBlock = block.children[0];

  if (firstBlock.text !== null && firstBlock.text !== undefined) {
    return isBlockTextEmpty(firstBlock);
  }

  if (firstBlock.type === "paragraph") {
    return isBlockParagraphEmpty(firstBlock);
  }

  if (firstBlock.type === "list-item") {
    return isBlockListItemEmpty(firstBlock);
  }

  if (firstBlock.type === "layout-area") {
    return isBlockLayoutAreaEmpty(block.children);
  }
}

function documentRequired(
  item: BaseItem,
  resolvedData: Record<string, any>,
  addValidationError: (error: string) => void,
  errorMessage: string = "Content must not be null",
) {
  const prevContent = item?.content;
  const resolvedContent = resolvedData?.content;
  const hasPrevContent = !isDocumentEmpty(prevContent as any);
  const hasResolvedContent = !isDocumentEmpty(resolvedContent);
  const isDeletingContent =
    hasPrevContent && !hasResolvedContent && resolvedContent !== undefined;

  if ((!hasPrevContent && !hasResolvedContent) || isDeletingContent) {
    return addValidationError(errorMessage);
  }
}

export { documentRequired };
