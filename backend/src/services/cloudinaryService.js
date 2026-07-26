const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");


const uploadPdfToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {


        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "telegram-lms/pdfs",

                resource_type: "raw",

                format: "pdf",
            },


            (error, result) => {

                if (error) {
                    reject(error);
                } 
                else {
                    resolve(result);
                }

            }
        );


        streamifier
            .createReadStream(fileBuffer)
            .pipe(stream);


    });

};



module.exports = {
    uploadPdfToCloudinary,
};