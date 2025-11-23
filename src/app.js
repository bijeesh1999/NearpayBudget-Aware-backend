import { Router } from "express";
import userRouter from "./services/users/routes/route.js";
import categoryRouter from "./services/categories/routes/route.js";
import budgetRouter from "./services/budgets/routes/route.js";
import expenseRouter from "./services/expenses/routes/route.js";
import { authMiddleware } from "./middleware/auth.js";

const router = Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/budget", authMiddleware, budgetRouter);
router.use("/expense", authMiddleware, expenseRouter);

export default router;
