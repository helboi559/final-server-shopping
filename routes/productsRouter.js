import { Router } from "express";
import { getProducts } from "../controllers/products.js";
import auth from "../middleware/auth.js";

const productsRouter = Router()

productsRouter.get('/all-products',getProducts)

export default productsRouter