
import { Schema, model } from "mongoose";
import { TMunicipality, TState } from "../types/location/state.types";

const MunicipalitySchema = new Schema<TMunicipality>({
    name: {
        type: String
    }
}, { _id: false });


const StateSchema = new Schema<TState>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
      minlength: 2,
      maxlength: 3,
    },

    country: {
      type: String,
      required: true,
      enum: ["MX"],
      default: "MX",
    },

    municipalities: {
      type: [MunicipalitySchema],
      required: true,
      default: [],
    },
  },{ timestamps: true });

export const State = model<TState>("State", StateSchema, "states");