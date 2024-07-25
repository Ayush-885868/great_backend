// const asyncHandler = ()=>{

// }




//const asyncHandler = () =>{}
//const asyncHandler = (func) => () => {}  //higher order function
// const asyncHandler = (fn)=> async(req,res, next) =>{    //wrapper function  will use everywhere
//     try{
//         await fn(req,res, next)

//     }
//     catch(err){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })

//     }

// }


// or we can write same code as written above in different format

const asyncHandler = (requestHandler) =>{
    (req,res,next)=>{
    Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}

export {asyncHandler}