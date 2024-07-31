import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });


    const uploadOnCloudinary = async (localFilePath) =>{
        try{
            if(!localFilePath)return null;
           const response = await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            }) // means path of the file or image

            //file has been uploaded successfully
            console.log("file is uploaded on clodinary", response.url); //after uploading will get public url
            return response;

        }
        catch(err){
            //means file is in my local storage but not uploaded so remove malicious file from local storage delete that file
            fs.unlinkSync(localFilePath) // remove the locally saved temporary file as theupload operation got failed
            return null;

        }

    }

    export {uploadOnCloudinary}
    
    
    