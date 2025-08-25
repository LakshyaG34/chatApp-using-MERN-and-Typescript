import dotenv from "dotenv"

export const MONGO_URI : string = process.env.MONGO_URI as string;
export const JWT_SECRET : string = process.env.JWT_SECRET as string;