// seedTransactions.ts

import mongoose from "mongoose";
import { MONGO_URI } from "./constants/env.js";
import TransactionModel from "./models/transaction.model.js";

const userId = new mongoose.Types.ObjectId("689b45f61fd373268348ce64");
const categoryIds = [
  "689aeb284eed410e6005af4e",
  "689aebe04eed410e6005af50",
  "689aebf74eed410e6005af52",
  "689aec044eed410e6005af54",
  "689aec484eed410e6005af57",
].map((id) => new mongoose.Types.ObjectId(id));

const transactions = [
  {
    userId,
    type: "income",
    amount: 2000,
    account: "Company Payroll",
    categoryId: categoryIds[0],
    date: new Date("2024-07-01T10:00:00Z"),
    isRecurring: true,
    dueDate: 1,
  },
  {
    userId,
    type: "expense",
    amount: -150,
    account: "Grocery Store",
    categoryId: categoryIds[1],
    date: new Date("2024-07-02T12:00:00Z"),
    isRecurring: false,
  },
  {
    userId,
    type: "expense",
    amount: -50,
    account: "Gym Membership",
    categoryId: categoryIds[2],
    date: new Date("2024-07-03T09:00:00Z"),
    isRecurring: true,
    dueDate: 5,
  },
  {
    userId,
    type: "income",
    amount: 300,
    account: "Freelance Project",
    categoryId: categoryIds[3],
    date: new Date("2024-07-04T14:00:00Z"),
    isRecurring: false,
  },
  {
    userId,
    type: "expense",
    amount: -70,
    account: "Electric Company",
    categoryId: categoryIds[4],
    date: new Date("2024-07-05T08:00:00Z"),
    isRecurring: true,
    dueDate: 15,
  },
  // Dodaj još koliko želiš...
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    await TransactionModel.deleteMany({ userId });
    console.log("Old transactions deleted");

    await TransactionModel.insertMany(transactions);
    console.log("Transactions seeded successfully");

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding transactions:", err);
    process.exit(1);
  }
}

seed();
