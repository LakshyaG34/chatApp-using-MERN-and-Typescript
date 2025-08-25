import dotenv from "dotenv"

dotenv.config();

import mongoose from "mongoose";
import {MONGO_URI} from "../config"

export const dbConnect = async() : Promise<void> =>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to DB");
    }
    catch(err)
    {
        console.log("Cannot Connect to DB", err);
    }
}