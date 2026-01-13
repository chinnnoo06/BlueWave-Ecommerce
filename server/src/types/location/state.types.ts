import { Types } from "mongoose";

export type TMunicipality = {
    name: string
};

export type TState = {
    _id?: Types.ObjectId
    name: string
    code: string
    country: "MX"
    municipalities: TMunicipality[]
};
