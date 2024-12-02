export function swap<T>(array: T[], a: number, b: number) {
    const copy = array.slice();
    const temp = copy[a];

    copy[a] = copy[b];
    copy[b] = temp;

    return copy;
}
