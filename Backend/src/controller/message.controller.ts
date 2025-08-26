import Conversation from "../model/conversation.model";
import Message from "../model/message.model";
import { getReceiverSocketId, io } from "../server";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/auth";


export const sendMessage = async(req : AuthenticatedRequest, res : Response) : Promise<Response | void> =>{
    try{
        const {message} = req.body;
        const {id : receiverId} = req.params;
        const senderId = req.user?._id;

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        });

        if(!conversation)
        {
            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId)
        {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);

    }catch(error)
    {
        console.log("Error sending message", error);
        res.status(500).json({Error : "Internal Server Error"});
    }
}

export const getMessage = async(req : AuthenticatedRequest, res : Response) : Promise<Response | void> =>{
    try{
        const {id : userToChatId} = req.params;
        const senderId = req.user?._id;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChatId]}
        }).populate("messages");
        console.log(conversation);
        if(!conversation)
        {
            return res.status(200).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    }catch(err)
    {
        console.log("Error getting messages", err);
        res.status(500).json({Error : "Internal Server Error"});
    }
}
