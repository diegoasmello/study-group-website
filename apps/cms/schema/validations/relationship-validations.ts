import { BaseItem } from "@keystone-6/core/types";
import { isEmpty } from "../../utils/checks";

function relationshipRequired<ItemType, ResolvedDataType>({
  item,
  resolvedData,
  addValidationError,
  extractRelationId,
  extractRelation,
  errorMessage = "Relationship must not be null",
}: {
  item: BaseItem;
  resolvedData: Record<string, any>;
  addValidationError: (error: string) => void;
  extractRelationId: (item: ItemType) => string;
  extractRelation: (resolvedData: ResolvedDataType) => { disconnect: boolean };
  errorMessage?: string;
}) {
  const extractedRelation = extractRelation(resolvedData as ResolvedDataType);
  if (
    (isEmpty(extractRelationId(item as ItemType)) &&
      extractedRelation === undefined) ||
    extractedRelation?.disconnect
  ) {
    return addValidationError(errorMessage);
  }
}

export { relationshipRequired };
