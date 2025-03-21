import {
  BaseItem,
  BaseListTypeInfo,
  KeystoneContextFromListTypeInfo,
} from "@keystone-6/core/types";
import { isEmpty } from "../utils/checks";

// async function relationshipRequired({
//   item,
//   resolvedData,
//   many,
//   context,
//   operation,
//   addValidationError,
//   errorMessage = "Relationship must not be null",
// }: {
//   item: BaseItem;
//   resolvedData: Record<string, any>;
//   many: boolean;
//   context: KeystoneContextFromListTypeInfo<BaseListTypeInfo>;
//   operation: "create" | "update" | "delete";
//   addValidationError: (error: string) => void;
//   errorMessage?: string;
// }) {
//   //   const findedItem = await context.db.Project.findMany({
//   //     where: {
//   //       id: {
//   //         equals: item.id,
//   //       },
//   //     },
//   //   });

//   const isDeleting = resolvedData?.item?.researchers === undefined;

//   const findedItem = await context.graphql.run({
//     query: `query {
//         project(
//             where:  {
//                 id: "${item.id.toString()}"
//             }
//         ) {
//             id
//             researchers {
//                 id
//             }
//         }
//     }`,
//   });
//   console.log({
//     item,
//     resolvedData,
//     findedItem: findedItem?.["project"]?.["researchers"],
//     disconnect: resolvedData?.item?.researchers?.disconnect,
//     connect: resolvedData?.item?.researchers?.connect,
//   });
//   return addValidationError("teste");
// }

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
