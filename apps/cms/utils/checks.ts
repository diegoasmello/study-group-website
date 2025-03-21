function isEmpty(obj: object | string) {
  if (obj === undefined || obj === null || obj === "") return true;

  return Object.values(obj).every(
    (attr) => attr === null || attr === undefined || obj === "",
  );
}

function isEmptyArray(arr: (object | string)[]) {
  return arr.every((item) => isEmpty(item));
}

function isObjAttrNull(obj: object) {
  return Object.values(obj).every((attr) => attr === null);
}

export { isEmpty, isEmptyArray, isObjAttrNull };
