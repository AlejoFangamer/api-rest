import z from "zod";

const schema = z.object({
  product: z.string({
    invalid_type_error: "PRODUCTO INVALIDO",
    required_error: "SE REQUIERE NOMBRE DEL PRODUCTO",
  }),
  brand: z.string(),
  price: z.number().int().min(0).max(1000000),
  state: z.string(),
  description: z.string(),
  photo: z.string().url({
    message: "EL ELEMENTO PUESTO NO ES UNA URL",
  }),
  type: z.array(
    z.enum([
      "Teclado",
      "Microfono",
      "Raton",
      "Audifono",
      "Inalambrico",
      "Alambrico"
    ]),
    {
      required_error: "SE REQUIERE ALMENOS UN TIPO",
      invalid_type_error: "TIPO INVALIDO",
    }
  ),
  rate: z.number().min(0).max(10).default(0),
});

export function validateProduct(input) {
  return schema.safeParse(input);
}

export function validatePartialProduct(input) {
  return schema.partial().safeParse(input);
}