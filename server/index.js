import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

 
import PostRouter from "./routes/Posts.js"
import GenerateImageRouter  from "./routes/GenerateImage.js";


dotenv.config();

const app =express();
app.use(cors());
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({extended:true}));

//error handle
app.use((err,req,res,next)=>{
    const status =err.status || 500;
    const message  =err.message || "Something  went wrong!";

    return res.status(status).json({
    success:false,
    status,
    message,
    });
});

app.use("/api/post",PostRouter);
app.use("/api/generateImage",GenerateImageRouter);

//Default get
app.get("/",async (req,res)=>{

    res.status(200).json({
      message:"Hello LINE Developer",
    });
});


//function to connect to mongodb
const  connectDB =()=>{
    mongoose.set("strictQuery",true);
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>{
        console.log("Failed to  connect to DB");
        console.log(err);
    });
};

//function to start the server
const startServer = async () =>{
    try{
        connectDB();
app.listen(8080,()=> console.log("Serer started  on port 8080"));
    }catch(error){
console.log(error);
    }

};

startServer();