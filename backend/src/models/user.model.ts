import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt.js";

export interface UserDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  fullName: string;
  verified: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (value: string) => Promise<boolean>;
  omitPassword: () => Omit<UserDocument, "password">;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true, trim: true },
    verified: { type: Boolean, required: true, default: false },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

// userSchema.index({ email: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashValue(this.password, 8);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const UserModel = mongoose.model<UserDocument, mongoose.Model<UserDocument>>(
  "User",
  userSchema
);

export default UserModel;
