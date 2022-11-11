import { Router } from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/products.js";
import auth from "../middleware/auth.js";
import checkAccess from "../middleware/checkAccess.js";
import productPermissions from "../middleware/permissions/products/productPermissions.js";
const productsRouter = Router()

productsRouter.get('/all-products',getProducts)
productsRouter.delete('/:productId',auth,checkAccess(productPermissions.delete),deleteProduct)
productsRouter.patch('/:productId',auth,checkAccess(productPermissions.update),updateProduct)
productsRouter.post("/create-product",auth,checkAccess(productPermissions.create),createProduct)

export default productsRouter