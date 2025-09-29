import { OK } from "../constants/http.js";
import { getCurrentBalance } from "../services/overview.service.js";
import catchErrors from "../utils/catchErrors.js";

export const getCurrentBalanceHandler = catchErrors(async (req, res) => {
  // call service
  const currentBalance = await getCurrentBalance(req.userId);

  // return response
  return res.status(OK).json({ currentBalance });
});
