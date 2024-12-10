import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/user.model";
import { Response } from "express";

export const generateToken = (res:Response, user:IUserDocument ) => {
    const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY!, {expiresIn:'30d'});
    res.cookie("token", token, 
        {
            httpOnly:true, 
            sameSite:'strict', 
            secure: true,
            // secure: process.env.NODE_ENV === 'production',
            maxAge:30 * 24 * 60 * 60 * 1000
        }
    );
    return token;
}