import "dotenv/config";
import multer from "multer";
import { config, uploader } from "cloudinary";
import path from "path";
import { parser } from "./md.cjs";

const storage = multer.memoryStorage();
export const upload = multer({ storage });
export const cloudinaryConfig = (req, res, next) => {
  config({
    url: process.env.CLOUDINARY_URL,
  });
  next();
};

export const uploadMiddleware = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    ).content;

    const result = await uploader.upload(file);
    if (!result) {
      next();
    }
    const imageUrl = result.url;
    req.file.path = imageUrl;
    req.file.public_id = result.public_id;
    next();
  } else {
    next();
  }
};

export const handlePostImageUpload = async (req, res, next) => {
  if (req.file) {
    const file = parser.format(
      path.extname(req.file.originalname).toString(),
      req.file.buffer
    ).content;
    const result = await uploader.upload(file);
    if (!result) {
      return res.status(500).json({ message: "Unable to upload image" });
    }
    const imageUrl = result.url;

    return res.status(201).json({
      url: imageUrl,
    });
  } else {
    return res.status(400).json({ message: "No file received" });
  }
};
