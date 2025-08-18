import { CREATED } from "../constants/http.js";
import { addRecurringBillSchema } from "../schemas/recurringBill.schemas.js";
import { addRecurringBill } from "../services/recurringBill.service.js";
import catchErrors from "../utils/catchErrors.js";

export const addRecurringBillHandler = catchErrors(async (req, res) => {
  // validate request
  const request = addRecurringBillSchema.parse(req.body);

  // call service
  const { recurringBill } = await addRecurringBill({
    ...request,
    userId: req.userId,
  });

  // return response
  return res
    .status(CREATED)
    .json({ message: "Recurring bill successfully added", recurringBill });
});
