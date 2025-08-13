import { CREATED } from "../constants/http.js";
import { addBudgetSchema } from "../schemas/budget.schemas.js";
import { addBudget } from "../services/budget.service.js";
import catchErrors from "../utils/catchErrors.js";

export const addBudgetHandler = catchErrors(async (req, res) => {
  // validate request
  const request = addBudgetSchema.parse(req.body);

  // call service
  const { budget } = await addBudget({ ...request, userId: req.userId });

  // return response
  return res
    .status(CREATED)
    .json({ message: "Budget successfully added", budget });
});
