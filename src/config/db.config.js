import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export async function connectMongoo() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed", err);
    process.exit(1);
  }
}
