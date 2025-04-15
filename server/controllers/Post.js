import Post from "../models/Post.js";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import {v2 as cloudinary} from "cloudinary";
import crypto from "crypto"; // For generating signature


dotenv.config();

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET,   
});

export const getAllPosts =async (req,res,next)=>{

    try{
    const posts = await Post.find({});
    return res.status(200).json({success:true , data :posts});
    }catch(error){
        next(createError(error.status,error?.response?.data?.error?.message ||error?.message));
    }
};

//create post

export const createPost =async (req,res,next)=>{
   try{
    const {name,prompt,photo}=req.body;
    const photoUrl =await cloudinary.uploader.upload(photo);
    const newPost =await Post.create({
        name,
        prompt,
        photo:photoUrl?.secure_url,
    });
    return res.status(201).json({success:true , data :newPost});
   }catch(error){
    next(createError(error.status,error?.response?.data?.error?.message ||error?.message));
}
};

export const createPost2 = async (req, res, next) => {
    try {
      const { name, prompt, photo } = req.body;
  
      // Check if required fields are present
      if (!name || !prompt || !photo) {
        return next(createError(400, "All fields (name, prompt, photo) are required"));
      }
  
      // Prepare the timestamp for Cloudinary signature
      const timestamp = Math.floor(Date.now() / 1000);
  
      // Create the string to sign (Cloudinary requires a timestamp and api_key for signature)
      const signatureString = `timestamp=${timestamp}&api_key=${process.env.CLOUDINARY_API_KEY}`;
  
      // Generate the signature using the API secret
      const signature = crypto
        .createHash("sha1")
        .update(signatureString + process.env.CLOUDINARY_API_SECRET)
        .digest("hex");
  
      // Upload the image to Cloudinary
      const base64Data = photo.replace(/^data:image\/\w+;base64,/, ""); // Remove base64 prefix
      const cloudinaryResponse = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`, {
        timestamp,
        signature,
        folder: "ai-images", // You can change this to any folder you prefer
      });
  
      // Save the post details to the database
      const newPost = await Post.create({
        name,
        prompt,
        photo: cloudinaryResponse.secure_url, // Get the secure URL of the uploaded image
      });
  
      return res.status(201).json({ success: true, data: newPost });
  
    } catch (error) {
      console.error("Error during createPost:", error);
      return next(createError(500, error.message || "Something went wrong"));
    }
  };