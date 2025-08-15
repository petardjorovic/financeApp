import { OK } from "../constants/http.js";
import CategoryModel from "../models/category.model.js";
import { addCategorySchema } from "../schemas/category.schemas.js";
import catchErrors from "../utils/catchErrors.js";

export const addCategoryHandler = catchErrors(async (req, res) => {
  const request = addCategorySchema.parse(req.body);

  await CategoryModel.create(request);

  return res.status(OK).json({
    message: "Category successfully added",
  });
});

export const getCategoriesHandler = catchErrors(async (req, res) => {
  const categories = await CategoryModel.find().sort({ name: 1 }).lean();

  return res.status(OK).json(categories);
});
