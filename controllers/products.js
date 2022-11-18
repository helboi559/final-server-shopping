import Product from "../models/Product.js";
import tryCatch from "./util/tryCatch.js";



export const getProducts = tryCatch(async (req, res) => {
  const products = await Product.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: products });
});


export const updateProduct = tryCatch(async (req, res) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {new: true}
  );
  res.status(200).json({ success: true, result: updatedProduct });
});

export const deleteProduct = tryCatch(async (req, res) => {
  const {_id} = await Product.findByIdAndDelete(req.params.productId);
  console.log("id",_id)
  res.status(200).json({ success: true, result: {_id} });
})

export const createProduct = tryCatch(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json({ success: true, result: product });
});