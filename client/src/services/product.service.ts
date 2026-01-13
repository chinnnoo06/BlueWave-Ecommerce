import axios, { AxiosError } from "axios";
import { Global } from "../helpers/config/env";
import type { TCategory } from "../types/category.types";
import { ProductSchema } from "../schemas/product.schema";
import type { TProduct } from "../types/product.types";
import type { TResponseCatalogSchema } from "../types/catalog.tpyes";
import { ResponseCatalogSchema } from "../schemas/catalog.schema";
import z from "zod";

export const getHomeProducts = async (): Promise<TProduct[]> => {
    const url = `${Global.url}/api/product/get-carousel`

    try {

        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = z.array(ProductSchema).safeParse(data.products);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener productos de home"
            );
        }

        throw new Error(`${error}`);
    }
}

export const getProducts = async (category: TCategory['slug'], page: number): Promise<TResponseCatalogSchema> => {
    if (category === "todos") category = "all"
    const url = `${Global.url}/api/product/get/${category}/${page}`

    try {

        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = ResponseCatalogSchema.safeParse(data);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener productos"
            );
        }

        throw new Error(`${error}`);
    }
}

export const getProductsBySearch = async (search: string, page: number): Promise<TResponseCatalogSchema> => {
    
    const url = `${Global.url}/api/product/get-search/${search}/${page}`

    try {

        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = ResponseCatalogSchema.safeParse(data);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener productos"
            );
        }

        throw new Error(`${error}`);
    }
}

export const getOneProduct = async (slugId: string): Promise<TProduct> => {
   
    const url = `${Global.url}/api/product/get/${slugId}`

    try {

        const { data } = await axios.get(url, {
            withCredentials: true,
        });

        if (data.status !== "success") {
            throw new Error("Respuesta inválida del servidor");
        }

        const result = ProductSchema.safeParse(data.product);

        if (!result.success) {
            throw new Error("Respuesta inválida del servidor");
        }

        return result.data;

    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(
                error.response?.data?.mensaje || "Error al obtener producto"
            );
        }

        throw new Error(`${error}`);
    }
}