import Router from "express";
import { createNewCategory } from "../controllers/create.controller.js";
import { findCategory } from "../controllers/findAll.controller.js";
import { findOneCategory } from "../controllers/findOne.controller.js";
import { updateOneCategory } from "../controllers/update.controller.js";
import { authMiddleware } from "../../../middleware/auth.js";

const router = Router();

router.post("/create", authMiddleware, createNewCategory);
router.post("/list", authMiddleware, findCategory);
router.get("/find/:id", authMiddleware, findOneCategory);
router.put("/update/:id", authMiddleware, updateOneCategory);
router.put("/delete/:id", authMiddleware, updateOneCategory);
// router.patch("/:id/status", updateOneTask);

export default router;
