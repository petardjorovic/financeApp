import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt.js";

export interface UserDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string; // ⚠️ sad može biti optional jer Google user nema password
  fullName: string;
  avatar: string;
  verified: boolean;
  role: string;
  googleId?: string; // ✅ novo polje
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
    password: { type: String, required: false }, // ✅ nije obavezno za Google usera
    fullName: { type: String, required: true, trim: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dhfzyyycz/image/upload/v1759766870/user_fylf06.png",
    },
    verified: { type: Boolean, required: true, default: false },
    role: { type: String, default: "user" },
    googleId: { type: String, required: false, unique: true, sparse: true }, // ✅ sparse dozvoljava null vrednosti kad je unique
  },
  {
    timestamps: true,
  }
);

// userSchema.index({ email: 1 });

// Hashuj samo ako postoji password (Google useri ga nemaju)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) {
    return next();
  }
  this.password = await hashValue(this.password, 8);
  next();
});

userSchema.methods.comparePassword = async function (val: string) {
  // Ako user nema password (npr. Google korisnik)
  if (!this.password) return false;

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
