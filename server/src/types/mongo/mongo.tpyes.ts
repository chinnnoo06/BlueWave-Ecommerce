import { Types } from "mongoose"

export type TMongoId = {
  _id: Types.ObjectId
}

export type TMongoIdParams = {
  id: string
}