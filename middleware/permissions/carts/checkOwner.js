import Cart from "../../../models/Cart.js";

const CheckOwner = async (req, res, next) => {
    try {
        const cart = await Cart.findById({_id: req.params.id, uid: req.user.id});
       if (cart) {
        return true
       } 
       return false;
    } catch (error) {
        console.log(error)
        return "error"
    }
}

export default CheckOwner;