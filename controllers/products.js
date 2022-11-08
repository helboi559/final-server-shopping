import Product from "../models/Product.js";
import tryCatch from "./util/tryCatch.js";



export const getProducts = tryCatch(async (req, res) => {
  const products = await Product.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: products });
});