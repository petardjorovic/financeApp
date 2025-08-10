import mongoose from "mongoose";

interface ThemeDocument extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const themeSchema = new mongoose.Schema<ThemeDocument>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<
  ThemeDocument,
  mongoose.Model<ThemeDocument>
>("Category", themeSchema);

export default CategoryModel;
