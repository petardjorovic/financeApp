import multer, { FileFilterCallback } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import AppError from "../utils/AppError.js";
import { BAD_REQUEST } from "../constants/http.js";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/bmp",
    "image/tiff",
    "image/svg+xml",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        BAD_REQUEST,
        "Invalid image type or image are bigger than 500KB. Allowed types are: JPG, PNG, WEBP, GIF, BMP,TIFF and SVG."
      )
    );
  }
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "finance_app_users",
    public_id: (req: Request, file: Express.Multer.File) => {
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const originalName = file.originalname.split(".")[0];
      return `${originalName}_${timestamp}_${randomString}`;
    },
  } as any,
});

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024,
  },
});

export default upload;
