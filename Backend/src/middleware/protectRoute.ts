import jwt from "jsonwebtoken"
import Auth from "../model/auth.model"
import { JWT_SECRET } from "../config";
// import { UserTypes } from "../types/auth";
import express, {Response, NextFunction} from "express"
// import {Document} from "mongoose"
import { AuthenticatedRequest } from "../types/auth";

interface UserTypes{
    userId : string
}
// export interface AuthDocument extends Document{
//     name : string;
//     email : string;
//     password : string;
// }

// declare global {
//     namespace Express{
//         interface Request{
//             user ?: {
//                 name:string;
//                 email:string;
//                 password:string;
//             };
//         }
//     }
// }

const protectRoute = async(req : AuthenticatedRequest, res : Response, next : NextFunction) : Promise<Response | void> =>{
    try{
        const token = req.cookies.jwt;

        if(!token)
        {
            return res.status(401).json({message : "Unauhtorized - No token Provided"});
        }
        const decoded = jwt.verify(token, JWT_SECRET) as UserTypes; // jwt.verify returns string | object

        if(!decoded)
        {
            return res.status(401).json({message : "Unauhtorized - Invalid token"});
        }

        const user = await Auth.findById(decoded.userId).select("-password");

        if(!user)
        {
            return res.status(404).json({message : "User Not found"});
        }

        req.user = {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        };

        next();
    }
    catch(error)
    {
        console.log("Error in protectRoute middleware: ", error);
		res.status(500).json({ error: "Internal server error" });
    }
};

export default protectRoute;