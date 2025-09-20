import { OK } from "../constants/http.js";
import ThemeModel from "../models/theme.model.js";
import { addThemeSchema } from "../schemas/thema.schemas.js";
import catchErrors from "../utils/catchErrors.js";

export const addThemeHandler = catchErrors(async (req, res) => {
  const theme = addThemeSchema.parse(req.body);

  await ThemeModel.create({ name: theme.name, color: theme.color });

  return res.status(OK).json({
    message: "Theme successfully added",
  });
});

export const getThemesHandler = catchErrors(async (req, res) => {
  const themes = await ThemeModel.find()
    .sort({ name: 1 })
    .select({ _id: 1, name: 1, color: 1 })
    .lean();

  return res.status(OK).json(themes);
});
