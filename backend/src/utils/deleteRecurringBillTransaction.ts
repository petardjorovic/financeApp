import mongoose from "mongoose";
import RecurringBillModel from "../models/recurringBill.js";
import appAssert from "./appAssert.js";
import { NOT_FOUND } from "../constants/http.js";
import TransactionModel from "../models/transaction.model.js";

type Params = {
  userId: mongoose.Types.ObjectId;
  recurringBillId: string;
};

const deleteRecurringBillTransaction = async ({
  userId,
  recurringBillId,
}: Params) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    //* chack weather recurringBill exist
    const recurringBill = await RecurringBillModel.exists({
      _id: recurringBillId,
      userId,
    }).session(session);
    appAssert(recurringBill, NOT_FOUND, "Recurring bill not found");

    //* delete recuringBill
    await RecurringBillModel.deleteOne({
      _id: recurringBillId,
      userId,
    }).session(session);

    //* set to undefined all recuring bill id in relative transactions
    const result = await TransactionModel.updateMany(
      {
        userId,
        recurringBillId,
      },
      {
        $unset: { recurringBillId: "" },
      }
    ).session(session);

    // Opcionalno, možeš da loguješ broj update-ovanih dokumenata
    // console.log(`${result.modifiedCount} transactions updated`);

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

export default deleteRecurringBillTransaction;
