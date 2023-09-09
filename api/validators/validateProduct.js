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
    required_error: "SE REQUIERE NOMBRE DEL PRODUCTO",
  }),
  brand: z.string(),
  price: z.number().int().min(0).max(100000000),
  state: z.enum(estadosPermitidos),
  description: z.string(),
  photo: z.string().url({
    message: "EL ELEMENTO PUESTO NO ES UNA URL",
  }),
  type: z.array(z.enum(tiposPermitidos), {
    required_error: "SE REQUIERE ALMENOS UN TIPO",
    invalid_type_error: "TIPO INVALIDO",
  }),
  rate: z.number().min(0).max(10).default(0),
});

export function validateProduct(input) {
  return schema.safeParse(input);
}

export function validatePartialProduct(input) {
  return schema.partial().safeParse(input);
}
