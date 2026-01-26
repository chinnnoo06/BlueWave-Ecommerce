import path from "path";
import fs from "fs";
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

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const deleteSingleUploadedFile = (file: Express.Multer.File) => {
  if (!file) return;
  try {
    const filePath = path.join(__dirname, "../uploads/categories", file.filename);
    fs.unlinkSync(filePath);
    console.log("Eliminado archivo único:", file.filename);
  } catch (err) {
    console.error(`Error eliminando ${file.filename}: ${err}`);
    throw new HttpError(500, `Error eliminando ${file.filename}: ${err}`);
  }
};

export const deleteUploadedFiles = (files: Express.Multer.File[]) => {
  if (!files) return;
  for (const file of files) {
    try {
      const filePath = path.join(__dirname, "../uploads/products", file.filename);
      fs.unlinkSync(filePath);
      console.log("Eliminada basura:", file.filename);
    } catch (err) {
      console.error(`Error eliminando ${file.filename}: ${err}`);
    }
  }
};