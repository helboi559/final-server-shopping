import tryCatch from "./util/tryCatch.js";
import Cart from "../models/cart.js";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//purchase cart
export const purchaseCart = tryCatch(async (req, res) => {
    const {id:uid,name:uName,photoURL:uPhoto} = req.user
    
    const {cart,total}=req.body;
    //stripe format array
    // const lineItems = []
    // cart.forEach((item)=>{
    //     lineItems.push(
    //       {
    //         price: item._id, quantity: item.quantity
    //       }
    //     )
    // })
    // const session = await stripe.checkout.sessions.create({
    //     line_items: lineItems,
    //     mode: 'payment',
    //     success_url: `${process.env.CLIENT_URL}/success`,
    //     cancel_url: `${process.env.CLIENT_URL}/cancel`,
    // });

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

//fetch all carts
export const fetchAllOrders = tryCatch(async (req, res) => {
  const orders = await Cart.find().sort({ _id: -1 });
  res.status(200).json({
    success: true,
    result: orders,
  });
});

// edit purchased carts
//fetch all carts admin