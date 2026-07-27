const Pdf = require("../models/Pdf");

const {
  uploadPdfToCloudinary,deletePdfFromCloudinary,
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
  .populate("uploadedBy", "firstName lastName username")
  .sort({ createdAt: -1 });



    res.status(200).json({

      success: true,

      count: pdfs.length,

      pdfs

    });


  } catch (error) {

    console.error(
      "Get PDFs Error:",
      error
    );


    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};



exports.getPdfById = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id)
      .select(
        "title description fileSize createdAt"
      );

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    return res.status(200).json({
      success: true,
      pdf,
    });

  } catch (error) {
    console.error("Get PDF Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.streamPdf = async (req, res) => {
  try {

    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    if (!req.user.isMember) {
      return res.status(403).json({
        success: false,
        message: "Join the Telegram group to access this PDF.",
      });
    }

    const response = await axios({
      url: pdf.fileUrl,
      method: "GET",
      responseType: "stream",
    });

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${pdf.originalName}"`
    );

    response.data.pipe(res);

  } catch (error) {
    console.error("Stream PDF Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find({
      uploadedBy: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select(
        "title description originalName fileUrl fileSize createdAt updatedAt"
      );

    return res.status(200).json({
      success: true,
      count: pdfs.length,
      pdfs,
    });
  } catch (error) {
    console.error("Get My PDFs Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatePdf = async (req, res) => {
  try {
    const { title, description } = req.body;

    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    if (pdf.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this PDF.",
      });
    }

    pdf.title = title ?? pdf.title;
    pdf.description = description ?? pdf.description;

    await pdf.save();

    return res.status(200).json({
      success: true,
      message: "PDF updated successfully",
      pdf,
    });

  } catch (error) {
    console.error("Update PDF Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    if (pdf.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this PDF.",
      });
    }

    await deletePdfFromCloudinary(pdf.publicId);

    await pdf.deleteOne();

    return res.status(200).json({
      success: true,
      message: "PDF deleted successfully",
    });

  } catch (error) {
    console.error("Delete PDF Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};