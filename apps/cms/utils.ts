export function slugify(text: string) {
  return text
    .toLowerCase() // Converte para minúsculas
    .normalize("NFD") // Remove acentos
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9 ]/g, "") // Remove caracteres especiais
    .trim() // Remove espaços extras
    .replace(/\s+/g, "-"); // Substitui espaços por hífens
}
