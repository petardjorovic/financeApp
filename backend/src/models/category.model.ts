import mongoose from "mongoose";

type CategoryType = "income" | "expense";

interface CategoryDocument extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  name: string;
  type: CategoryType;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema<CategoryDocument>(
  {
    name: { type: String, required: true, unique: true },
    type: { type: String, enum: ["income", "expense"], required: true },
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
