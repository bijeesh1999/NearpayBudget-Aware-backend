import Router from "express";
import { createNewExpense } from "../controllers/create.controller.js";
import { findExpense } from "../controllers/findAll.controller.js";
import { findOneExpense } from "../controllers/findOne.controller.js";

const router = Router();

router.post("/create", createNewExpense);
router.post("/list", findExpense);
router.get("/find/:id", findOneExpense);
// router.put("/update/:id", updateOneExpense);
// router.put("/delete/:id", updateOneExpense);


export default router;
