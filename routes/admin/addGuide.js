const Guide = require("../../models/Guide");
const cloudinary = require("../../middlewares/cloudinary");
const fs = require("fs");
const path = require("path");
const sizeOf = require("image-size");
module.exports = async (req, res) => {
  try {
    let { name, resume, adress, phone } = req.body;

    // const imgUrl = `/uploads/${req.file.filename}`;
    // ${req.protocol}://${req.headers.host}/uploads/${req.file.filename}
    const uploader = async (path) => await cloudinary.uploads(path, "uploads");
    let { path } = req.file;
    const { url } = await uploader(path);
    fs.unlinkSync(path);
    // console.log(url);
    const newGuide = await new Guide({
      name,
      resume,
      phone,
      adress,
      rate: Math.floor(Math.random() * 5 + 1),
      imgUrl: url,
    });
    await newGuide.save();
    res
      .status(200)
      .json({ status: true, message: "Your guide was added successfully" });
  } catch (error) {
    if (error) throw error;
    res.status(401).json({ status: false, error });
  }
};
