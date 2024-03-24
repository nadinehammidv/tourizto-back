const Guide = require("../../models/Guide");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
const path = require("path");
module.exports = async (req, res) => {
  try {
    let { id } = req.query;

    // const imgUrl = `/uploads/${req.file.filename}`;
    // console.log(imgUrl)
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);
    // console.log(url);
    const updatedUser = await Guide.findByIdAndUpdate(
      id,
      {
        $set: { imgUrl: url },
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      status: true,
      message: "Your profile picture has been updated successfully",
    });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
