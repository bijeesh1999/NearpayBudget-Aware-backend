import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,// hex or css color token
    },
    userId: {
      type: mongoose.ObjectId,
    },
    status: {
      type: String,
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);

