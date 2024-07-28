import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true

    },

    Email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true

    },
    avtar: {
        type: String, //cloudinary url like aws which gives url of files or images
        trim: true,

    },
    coverImage: {
        type: String,


    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"

    }],
    Password: {
        type: String,
        required: [true, 'Password is required'],

    },
    refreshToken: {
        type: String

    }

},
    {
        timestamps: true
    })

userSchema.pre("save", async function (next) {
    if (!this.isModified("Password")) return next()

    this.Password = bcrypt.hash(this.Password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (){
   return await bcrypt.compare(password, this.password )
}

userSchema.methods.generateAccessToken =  function (){
   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        { 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
 }

 userSchema.methods.generateRefreshToken = async function (password){
    return jwt.sign(
        {
            _id:this._id
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        { 
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
 }

export const User = mongoose.model("Use", userSchema)