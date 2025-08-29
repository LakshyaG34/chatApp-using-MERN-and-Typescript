import { Request } from "express";

export interface UserPayload {
  _id: string;
  name: string;
  email: string;
  // userId : string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}
// export interface ProfilePicParams extends Request {
//   id: string;
// }
// interface ProfilePicParams {
  
// }

export interface AuthTypes{
    name: string;
    email:string,
    password:string;
    confirmPassword:string;
}
