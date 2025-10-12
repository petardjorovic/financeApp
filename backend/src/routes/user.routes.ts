import { Router } from "express";
import {
  editPasswordHandler,
  getUserHandler,
} from "../controllers/user.controller.js";

const userRoutes = Router();

// prefix /user

userRoutes.get("/", getUserHandler);
userRoutes.patch("/password/edit", editPasswordHandler);

export default userRoutes;
