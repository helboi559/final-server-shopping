import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,min:2, max:40, required:true},
    email:{type:String,min:2, max:40, required:true, unique:true, trim:true},
    password:{type:String, required:true},
    photoURL:{type:String,default:''},
    role:{type:"String", default:'admin',enum:['basic','admin']},
    active:{type:Boolean, default:true},
    
},
{timeStamps:true}
)

const User = mongoose.model('users',userSchema)

export default User