import { Request } from "express";
import { Document } from "mongoose";

export interface UserPayload {
  _id: string;
  name: string;
  email: string;
  // userId : string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export interface AuthTypes{
    name: string;
    email:string,
    password:string;
    confirmPassword:string;
}
