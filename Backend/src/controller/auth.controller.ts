import { Request, Response } from "express";
import Auth from "../model/auth.model";
import { AuthTypes } from "../types/auth";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateToken";
import { AuthenticatedRequest } from "../types/auth";
import { upload } from "../middleware/protectImageRoute";

export const signup = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { name, email, password, confirmPassword } = req.body as AuthTypes;
    if (!name || !email || !password || !confirmPassword) {
      res.status(400).json({ message: "Missing Fields" });
    }
    const user = await Auth.findOne({ email });
    if (user) {
      res.status(400).json({ message: "User Already exists" });
    }
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ message: "Password and ConfirmPassword does not match" });
    }

    const salt = await bcrypt.genSalt(10);
    // const hashedPassword = bcrypt.genSalt(10, password);
    const hashedPassword = await bcrypt.hash(password, salt);


    //Handle Image upload
    let profilePic = undefined;
    if(req.file)
    {
      profilePic = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
    }

    const newUser = await Auth.create({
      name,
      email,
      password: hashedPassword,
      profilePic
    });
    if (newUser) {
      res.status(200).json({ message: "Signup Successfull" });
      console.log("Signed Up successfully", newUser);
    } else {
      res.status(400).json({ message: "Error Signing up" });
    }
  } catch (err) {
    console.log("Error caught while signing up", err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body as AuthTypes;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing Fields" });
    }
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    generateTokenAndSetCookie(user._id, res);
    // const token = req.cookies.jwt;
    res.status(200).json({
      // token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
    console.log("Logged In successfully", {
      _id : user._id,
      name : user.name,
      email : user.email
    });
  } catch (err) {
    console.log("Error loging in", err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

export const getMe = async (req : AuthenticatedRequest, res : Response) => {
  // protectRoute already sets req.user
  try {
    const user = await Auth.findById(req.user?._id).select("-password");
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logged out successfully" });
    console.log("Logged out succesfully");
  } catch (err) {
    console.log("Error logging out", err);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};
