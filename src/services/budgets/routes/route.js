import Router from "express";
import { createNewBudget } from "../controllers/create.controller.js";
import { findAllBudget } from "../controllers/findAll.controller.js";
import { findOneBudget } from "../controllers/findOne.controller.js";
import { updateOneBudget } from "../controllers/update.controller.js";

const router = Router();

router.post("/create", createNewBudget);
router.post("/list", findAllBudget);
router.get("/find/:id", findOneBudget);
router.put("/update/:id", updateOneBudget);
router.put("/delete/:id", updateOneBudget);

// router.patch("/:id/status", updateOneTask);

export default router;
