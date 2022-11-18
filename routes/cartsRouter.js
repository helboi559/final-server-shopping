import {Router} from 'express'
import { fetchAllOrders, fetchOrders, purchaseCart } from '../controllers/carts.js'
import auth from '../middleware/auth.js'
import checkAccess from "../middleware/checkAccess.js";
import cartPermissions from '../middleware/permissions/carts/cartPermissions.js';


const cartsRouter = Router()
cartsRouter.post('/purchase-cart',auth,purchaseCart)
cartsRouter.get('/my-orders',auth,fetchOrders)
cartsRouter.get('/all-orders',auth,checkAccess(cartPermissions.view),fetchAllOrders)



export default cartsRouter
