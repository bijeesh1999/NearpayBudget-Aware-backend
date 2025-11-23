import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectMongoo } from "./config/db.config.js";
import globalApiRoute from "./app.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.set("trust proxy", 1); // Use 1 if you know Render uses one proxy level
app.use(express.json());
app.use(cookieParser());
const FRONTEND_ORIGIN = process.env.FRONTEND_URL || "http://localhost:3000";
app.use(
  cors({
    origin: [
      "https://nearpay-budget-aware-frontend-7w0kfhs0g-bijeesh1999s-projects.vercel.app",
      "https://nearpay-budget-aware-frontend.vercel.app",
      "http://localhost:3000"
    ],
    credentials: true,
  })
);
connectMongoo();

app.use("/api", globalApiRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`http://localhost:${process.env.PORT || 3000}`);
});
