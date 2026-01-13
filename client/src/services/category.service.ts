import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import type { TCategory } from "../types/category.types";
import { CategorySchema } from "../schemas/category.schema";
import z from "zod";

export const getCategories = async (): Promise<TCategory[]> => {
    const url = `${Global.url}/api/category/get`

    try {

        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = z.array(CategorySchema).safeParse(data.categories);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener categorías"
            );
        }

        throw new Error(`${error}`);
    }
}