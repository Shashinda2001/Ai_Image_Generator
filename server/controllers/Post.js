import Post from "../models/Post.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
//import {vs as cloudinary} from "cloudinary";

import pkg from 'cloudinary';
const {vs: cloudinary} = pkg;

dotenv.config();

// Configuration
// cloudinary.config({ 
//     cloud_name: 'dnyqk89jw', 
//     api_key: '159881683291717', 
//     api_secret: 'CLOUDINARY_URL=cloudinary://159881683291717:wdR8RI-kYoxOr-aNXjrAE0wSZXk@dnyqk89jw' // Click 'View API Keys' above to copy your API secret
// });

export const getAllPosts =async (req,res,next)=>{

    try{
    const posts = await Post.find({});
    return res.status(200).json({success:true , data :posts});
    }catch(error){
        next(createError(error.status,error?.response?.data?.error?.message ||error?.message));
    }
};