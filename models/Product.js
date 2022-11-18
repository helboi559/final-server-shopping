import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    title:{type:String,min:2, max:40, required:true},
    category:{type:String,min:2, max:40, required:true},
    price:{type:Number,min:2, max:1500000, required:true},
    description:{type:String, required:true},
    image:{type:String,default:''},
})

const Product = mongoose.model('products',productSchema)

export default Product