import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoo } from "./config/db.config.js";
import globalApiRoute from "./app.js";
import cookieParser from "cookie-parser";
import { ipFilter } from "./config/ip.js";

dotenv.config();
const app = express();

app.set('trust proxy', 1); // Use 1 if you know Render uses one proxy level
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Your frontend URL
    credentials: true, // Allow credentials
  })
);
connectMongoo();

app.use("/api", globalApiRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost/${process.env.PORT || 3000}`);
});
