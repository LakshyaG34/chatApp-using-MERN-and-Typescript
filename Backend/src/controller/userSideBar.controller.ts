import Auth from "../model/auth.model"
import { AuthenticatedRequest } from "../types/auth";
import express, {Response} from "express"


export const getUsersForSideBar = async(req : AuthenticatedRequest, res : Response) : Promise<Response |void> =>{
    try{
        const loggedInUser = req.user?._id;
        const filteredUser = await Auth.find({_id : {$ne : loggedInUser}}).select("-password");

        res.status(200).json(filteredUser);
    }catch(err)
    {
        console.log("Error getting users for sidbar", err);
        res.status(500).json({Error: "Internal Server Error"})
    }
}