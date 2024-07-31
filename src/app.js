import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public")) //here public is a foldeer where we want to store public assets on our server
app.use(cookieParser());

// Router import

import userRouter from './routes/user.routes.js';
 
//routes declaration

app.use("/api/v1/users", userRouter) // here user will be prefix like http://localhost:8000api/v1/users/register

export {app}