import Router from "express";
import { createNewCategory } from "../controllers/create.controller.js";
import { findCategory } from "../controllers/findAll.controller.js";
import { findOneCategory } from "../controllers/findOne.controller.js";
import { updateOneCategory } from "../controllers/update.controller.js";

const router = Router();

router.post("/create", createNewCategory);
router.post("/list", findCategory);
router.get("/find/:id", findOneCategory);
router.put("/update/:id", updateOneCategory);
router.put("/delete/:id", updateOneCategory);
// router.patch("/:id/status", updateOneTask);

export default router;
