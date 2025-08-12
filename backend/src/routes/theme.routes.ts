import { Router } from "express";
import {
  addThemeHandler,
  getThemesHandler,
} from "../controllers/theme.controller.js";

const themeRoutes = Router();

// prefix /themes

themeRoutes.get("/", getThemesHandler);
themeRoutes.post("/", addThemeHandler);

export default themeRoutes;
