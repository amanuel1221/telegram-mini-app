const Pdf = require("../models/Pdf");

const {
  uploadPdfToCloudinary,
} = require("../services/cloudinaryService");

exports.uploadPdf = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });

    }

    const {
      title,
      description,
    } = req.body;

    const cloudinaryResult =
      await uploadPdfToCloudinary(
        req.file.buffer
      );
    const pdf = await Pdf.create({

      title,

      description,

      originalName:
        req.file.originalname,

      publicId:
        cloudinaryResult.public_id,

      fileUrl:
        cloudinaryResult.secure_url,

      fileSize:
        cloudinaryResult.bytes,


      uploadedBy:
        req.user._id,

    });

    return res.status(201).json({

      success: true,

      message:
        "PDF uploaded successfully",


      pdf,

    });


  } catch (error) {

    console.error(
      "PDF Upload Error:",
      error
    );

    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

exports.getAllPdfs = async (req, res) => {

    try {

        const pdfs = await Pdf.find()
            .select(
                "title description fileUrl fileSize createdAt"
            )
            .sort({
                createdAt: -1
            });



        res.status(200).json({

            success:true,

            count:pdfs.length,

            pdfs

        });


    } catch(error){

        console.error(
            "Get PDFs Error:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




exports.getPdfById = async (req,res)=>{

    try{


        const pdf = await Pdf.findById(
            req.params.id
        )
        .select(
            "title description fileUrl fileSize createdAt"
        );



        if(!pdf){

            return res.status(404).json({

                success:false,

                message:"PDF not found"

            });

        }



        res.status(200).json({

            success:true,

            pdf

        });



    }catch(error){


        console.error(
            "Get PDF Error:",
            error
        );


        res.status(500).json({

            success:false,

            message:error.message

        });


    }

};