import {Router} from 'express'
import { fetchOrders, purchaseCart } from '../controllers/carts.js'
import auth from '../middleware/auth.js'

const cartsRouter = Router()
cartsRouter.post('/purchase-cart',auth,purchaseCart)
cartsRouter.get('/my-orders',auth,fetchOrders)



export default cartsRouter
