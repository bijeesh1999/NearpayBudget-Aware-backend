import { findOneCategoryData } from "../services/find.service.js";

export async function findOneCategory(req, res) {
  // try {
    const { id } = req.params;

    const sigleCategory = await findOneCategoryData(id);

    return res.status(200).json({
      data: sigleCategory[0] || {},
      message: "Task fetch success",
    });
  // } catch (error) {
  //   res.status(400).json({
  //     message: "sigleCategory fetch failed",
  //     error: error,
  //   });
  // }
}
