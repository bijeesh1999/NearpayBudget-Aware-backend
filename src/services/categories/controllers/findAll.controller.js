import { findAllCategories } from "../services/findAll.service.js";

export async function findCategory(req, res) {
  // try {
  const body = req.body;
  const { month } = req.query;
  const id = req.user?._id;

  console.log({ user: req.user });

  const getAlluserData = await findAllCategories({ month, id });

  return res.status(200).json({
    data: getAlluserData || [],
    message: "user fetch success",
  });
  // } catch (error) {
  //   res.status(400).json({
  //     message: "data fetch failed",
  //     error: error,
  //   });
  // }
}
