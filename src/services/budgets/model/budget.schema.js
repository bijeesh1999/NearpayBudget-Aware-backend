import mongoose from "mongoose";

const budgetChema = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.ObjectId,
    },
    categoryId: {
      type: mongoose.ObjectId,
    },
    limitCents: {
      type: Number,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetChema);


