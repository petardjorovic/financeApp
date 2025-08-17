import mongoose from "mongoose";
import TransactionModel from "../models/transaction.model.js";
import TransactionTypes from "../constants/TransactionTypes.js";
import PotModel from "../models/pot.model.js";
import appAssert from "./appAssert.js";
import { NOT_FOUND } from "../constants/http.js";

type Params = {
  potId: string;
  userId: mongoose.Types.ObjectId;
};

const deletePotTransaction = async ({ potId, userId }: Params) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const pot = await PotModel.findOne({ _id: potId, userId }).session(session);
    appAssert(pot, NOT_FOUND, "Pot not found");

    let withdrawTransaction = null;

    if (pot.currentAmount > 0) {
      withdrawTransaction = await TransactionModel.create(
        [
          {
            userId,
            type: TransactionTypes.Withdraw,
            amount: pot.currentAmount,
            account: "Closed pot",
            date: new Date(),
          },
        ],
        { session }
      );
      withdrawTransaction = withdrawTransaction[0];
    }

    await pot.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    return {
      deletedPotId: potId,
      potName: pot.name,
      transaction: withdrawTransaction
        ? { ...withdrawTransaction.toObject() }
        : null,
    };
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export default deletePotTransaction;
