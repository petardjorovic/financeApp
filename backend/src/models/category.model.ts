import mongoose from "mongoose";

interface CategoryDocument extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<
  CategoryDocument,
  mongoose.Model<CategoryDocument>
>("Category", categorySchema);

export default CategoryModel;
