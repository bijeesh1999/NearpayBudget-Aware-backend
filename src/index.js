import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoo } from "./config/db.config.js";
import globalApiRoute from "./app.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Allow credentials
  })
);
connectMongoo();

app.use("/api", globalApiRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost/${process.env.PORT || 3000}`);
});
