import { Router } from "express";
import {
  editPasswordHandler,
  editProfileHandler,
  getUserHandler,
} from "../controllers/user.controller.js";
import upload from "../middleware/uploadImage.js";

const userRoutes = Router();

// prefix /user

userRoutes.get("/", getUserHandler);
userRoutes.patch("/profile/edit", upload.single("image"), editProfileHandler);
userRoutes.patch("/password/edit", editPasswordHandler);

export default userRoutes;
