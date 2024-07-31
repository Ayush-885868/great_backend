import {asyncHandler} from '../utils/asyncHandler.js';


const registerUrl = asyncHandler(async (req,res)=>{
     res.status(200).json({
        message:"ok i am observing"
    })
})

export  default registerUrl