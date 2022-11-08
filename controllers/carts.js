import tryCatch from "./util/tryCatch.js";
import Cart from "../models/cart.js";

//purchase cart
export const purchaseCart = tryCatch(async (req, res) => {
    const {id:uid,name:uName,photoURL:uPhoto} = req.user
    const {cart,total}=req.body;
    const date = new Date()
    const newOrder = new Cart({
        products:cart,
        total,
        date,
        uid,
    })
    await newOrder.save()
    // console.log("req.body.order",req.body)

    res.status(201).json({
        success: true,
        result: newOrder,
    });
})

//fetch carts by user id
export const fetchOrders = tryCatch(async (req, res) => {
  const {id:uid} = req.user
  const orders = await Cart.find({uid});
  console.log("ordersByUserId",orders)
  res.status(200).json({
    success: true,
    result: orders,
  });
});

// edit purchased carts
//fetch all carts admin