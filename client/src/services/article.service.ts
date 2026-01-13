
import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import type { TArticle } from "../types/article.types";
import { ArticleSchema } from "../schemas/article.schema";
import z from "zod";

export const getArtciles = async (): Promise<TArticle[]> => {
    const url = `${Global.url}/api/article/get`

    try {
        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = z.array(ArticleSchema).safeParse(data.articles);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener artículos"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const getArticlesInitials = async (id?: TArticle['_id']): Promise<TArticle[]> => {
    const url = id
        ? `${Global.url}/api/article/get-initials/${id}`
        : `${Global.url}/api/article/get-initials`

    try {
        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = z.array(ArticleSchema).safeParse(data.articles);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener artículos iniciales"
            );
        }

        throw new Error("Error inesperado");
    }
}

export const getOneArticle = async (slug: TArticle['slug']): Promise<TArticle> => {
    const url = `${Global.url}/api/article/get/${slug}`

    try {
        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = ArticleSchema.safeParse(data.article);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener artículo"
            );
        }

        throw new Error("Error inesperado");
    }
}