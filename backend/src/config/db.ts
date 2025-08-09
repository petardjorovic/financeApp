import mongoose from "mongoose";
import { MONGO_URI } from "../constants/env.js";

const connectToDatebase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Could not cennect to database", error);
    process.exit(1);
  }
};

export default connectToDatebase;
