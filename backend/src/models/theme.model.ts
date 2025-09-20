import mongoose from "mongoose";

interface ThemeDocument extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const themeSchema = new mongoose.Schema<ThemeDocument>(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const ThemeModel = mongoose.model<ThemeDocument, mongoose.Model<ThemeDocument>>(
  "Theme",
  themeSchema
);

export default ThemeModel;
