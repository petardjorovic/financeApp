import { Router } from "express";
import {
  editPasswordHandler,
  editProfileHandler,
  getUserHandler,
} from "../controllers/user.controller.js";

const userRoutes = Router();

// prefix /user

userRoutes.get("/", getUserHandler);
userRoutes.patch("/profile/edit", editProfileHandler);
userRoutes.patch("/password/edit", editPasswordHandler);

export default userRoutes;
