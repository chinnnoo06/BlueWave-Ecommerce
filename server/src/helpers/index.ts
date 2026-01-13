import { TProduct } from "../types/product/product.types";

export const generate6DigitCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export function shuffleWithSeed(array: TProduct[], seed: number) {
    let m = array.length, t: TProduct, i: number;
    const arr = [...array];
    while (m) {
        i = Math.floor(random(seed) * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
        seed++;
    }
    return arr;
}

// Generador pseudoaleatorio simple
function random(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}
