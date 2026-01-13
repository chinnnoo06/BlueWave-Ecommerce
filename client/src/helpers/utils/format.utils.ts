export const timeFormat = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFD")                // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-z0-9]+/g, "-")     // espacios y símbolos → -
    .replace(/(^-|-$)+/g, "");       // quita - al inicio/fin