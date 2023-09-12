import z from "zod";

const estadosPermitidos = ["Descontinuado", "Agotado", "Disponible"];
const tiposPermitidos = [
  "Teclado",
  "Microfono",
  "Raton",
  "Auriculares",
  "Torre",
  "Inalambrico",
  "Alambrico",
];

const schema = z.object({
  product: z.string({
    invalid_type_error: "PRODUCTO INVALIDO",
    required_error: "SE REQUIERE AL MENOS UN NOMBRE DEL PRODUCTO",
  }).trim().min(1, {
    message: "SE REQUIERE AL MENOS UNA LETRA PARA EL PRODUCTO"
  }),

  brand: z.string({
    invalid_type_error: "MARCA INVALIDA",
    required_error: "SE REQUIERE AL MENOS UN NOMBRE DE LA MARCA",
  }).trim().min(1, {
    message: "SE REQUIERE AL MENOS UNA LETRA PARA LA MARCA"
  }),

  price: z.number().int().min(0,{
    message: "PRECIO DEMASIADO BAJO"
  }).max(10000000,{
    message: "PRECIO DEMASIADO ALTO"
  }).default(0),

  state: z.enum(estadosPermitidos),

  description: z.string({
    invalid_type_error: "DESCRIPCIÓN INVALIDA",
    required_error: "SE REQUIERE AL MENOS UNA DESCRIPCION PARA EL PRODUCTO",
  }).trim().min(1, {
    message: "SE REQUIERE AL MENOS UNA LETRA PARA LA DESCRIPCIÓN"
  }),

  photo: z.string().url({
    message: "EL ELEMENTO PUESTO NO ES UNA URL",
  }),

  type: z.array(z.enum(tiposPermitidos), {
    required_error: "SE REQUIERE ALMENOS UN TIPO",
    invalid_type_error: "TIPO INVALIDO",
  }),

  rate: z.number({
    invalid_type_error: "PUNTUACIÓN INVALIDA",
  }).min(0,{
    message: "PUNTAJE DEMASIADO BAJO"
  }).max(10,{
    message: "PUNTAJE DEMASIADO ALTO"
  }).default(0),
});

export function validateProduct(input) {
  return schema.safeParse(input);
}

export function validatePartialProduct(input) {
  return schema.partial().safeParse(input);
}
