//require('dotenv').config({path:'./env'})
import dotenv from "dotenv"
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({path:'./env'})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 9000, ()=>{
        console.log(`Server is running at PORT: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB Connection Failed !!!", err)
})


//-r dotenv/config --experimental-json-modules






// import express from "express"
// const app = express();
// (async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error", (error)=>{
//         console.log("ERROR:", error);
//         throw error
//        })
//        app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on port ${process.envPORT}`);
//        })

//     }catch(err){
//         //console.log(err)
//         console.error("ERROR:", err)
//         throw err

//     }
// })()