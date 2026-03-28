import {
  minLength,
  minValue,
  number,
  object,
  pipe,
  string,
  url,
} from "valibot";

export const serieSchema = object({
  titulo: pipe(
    string(),
    minLength(3, "El título debe tener al menos 3 caracteres"),
  ),
  sinopsis: pipe(
    string(),
    minLength(10, "La sinopsis debe tener al menos 10 caracteres"),
  ),
  estreno: pipe(number(), minValue(1, "El año debe ser mayor a 0")),
  genero: pipe(
    string(),
    minLength(3, "El genero  debe tener al menos 3 caracteres"),
  ),
  urlPortada: pipe(string(), url("La URL de la imagen no es válida")),
  calificacion: pipe(number(),minValue(1, "El valor debe ser mayor a 0")),
  plataforma: pipe(string(),minLength(3, "El genero  debe tener al menos 3 caracteres")),

});
