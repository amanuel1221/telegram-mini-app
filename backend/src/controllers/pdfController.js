const Pdf = require("../models/Pdf");

const {
  uploadPdfToCloudinary,
} = require("../services/cloudinaryService");



/**
 * @desc Upload PDF
 * @route POST /api/pdfs/upload
 * @access Teacher only
 */
exports.uploadPdf = async (req, res) => {

  try {


    // Check file exists
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



    // Upload PDF to Cloudinary
    const cloudinaryResult =
      await uploadPdfToCloudinary(
        req.file.buffer
      );




    // Save PDF information
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

      success:false,

      message:error.message,

    });


  }

};