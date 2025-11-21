import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.ObjectId,
    },
    categoryId: {
      type: mongoose.ObjectId,

    },
    amountCents: {
      type: Number,
    },
    note: {
      type: String
    },
    date: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);

