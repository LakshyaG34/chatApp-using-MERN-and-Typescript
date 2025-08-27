import dotenv from "dotenv"
dotenv.config();

import jwt from "jsonwebtoken"

import {Response} from "express"
import { JWT_SECRET } from "../config";

const generateTokenAndSetCookie = async(userId : string, res : Response) : Promise<Response | void> =>{
        const token = jwt.sign({userId}, JWT_SECRET, {
            expiresIn : "15d"
        });

        res.cookie("jwt", token, {
            maxAge : 15*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:true
        })
}

export default generateTokenAndSetCookie;
