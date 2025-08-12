import { Router } from "express";
import {
  addCategoryHandler,
  getCategoriesHandler,
} from "../controllers/category.controller.js";

const categoryRoutes = Router();

// prefix /categories

categoryRoutes.get("/", getCategoriesHandler);
categoryRoutes.post("/", addCategoryHandler);

export default categoryRoutes;
