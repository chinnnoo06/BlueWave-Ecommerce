import z from "zod";

export const SearchFormSchema = z.object({
    search: z.string().min(1, "Ingrese una busqueda valida"),
});