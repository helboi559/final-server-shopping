import CheckOwner from "./checkOwner"

const cartPermissions = {
    //update carts
    update: {
        roles: ['admin'],
        checkOwner: CheckOwner
    },
    //delete carts
    delete: {
        roles: ['admin'],
        owner: CheckOwner
        
    }

}

export default cartPermissions