import Auth from "../model/auth.model"
import { AuthenticatedRequest } from "../types/auth";
import express, {Request, Response} from "express"


export const getUsersForSideBar = async(req : AuthenticatedRequest, res : Response) : Promise<Response |void> =>{
    try{
        const loggedInUser = req.user?._id;

        console.log(loggedInUser);
        const filteredUser = await Auth.find({_id : {$ne : loggedInUser}}).select("-password");
        console.log(filteredUser);

        res.status(200).json(filteredUser);
    }catch(err)
    {
        console.log("Error getting users for sidbar", err);
        res.status(500).json({Error: "Internal Server Error"})
    }
}

export const getUsersProfilePic = async(req : Request<{id : string}> ,res : Response) : Promise<Response | void>  =>{
    try{
        const user = await Auth.findById(req.params.id);
        if(!user || !user.profilePic || !user.profilePic.data){
            return res.status(404).send("No image found");
        }
        res.contentType(user.profilePic.contentType); // e.g., "image/png"
        return res.send(user.profilePic.data);
    }
    catch(err)
    {
        console.log("Internal Server err", err);
        res.status(500).send("Error retrieving Image");
    }
}