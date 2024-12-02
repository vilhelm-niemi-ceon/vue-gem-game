export function getUp(index:number) {
  return index - 6;
}

export function getDown(index:number) {
  return index + 6;
}

export function getLeft(index:number) {
  return index - 1;
}

export function getRight(index:number) {
  return index + 1;
}

export function inSameRow(indexA: number, indexB: number, columns: number = 6) {
  const rowA = Math.floor(indexA / columns);
  const rowB = Math.floor(indexB / columns);

  return rowA === rowB;
}
