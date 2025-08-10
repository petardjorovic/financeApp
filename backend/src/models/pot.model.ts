import mongoose from "mongoose";

interface PotDocument extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  target: number;
  currentAmount: number;
  themeId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const potSchema = new mongoose.Schema<PotDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    target: { type: Number, required: true, min: 0 },
    currentAmount: { type: Number, required: true, min: 0, default: 0 },
    themeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

potSchema.index({ userId: 1, name: 1 }, { unique: true });

const PotModel = mongoose.model<PotDocument, mongoose.Model<PotDocument>>(
  "Pot",
  potSchema
);

export default PotModel;
