import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    uid:{type:String, required:true},
    products:{type:Array, required:true},
    date:{type:Date, default:Date.now},
    total:{type:Number, required:true}
})

const Cart = mongoose.model('carts',cartSchema)

export default Cart