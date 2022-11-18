
const cartPermissions = {
    //update carts
    update: {
        roles: ['admin'],
        // checkOwner: CheckOwner
    },
    //delete carts
    delete: {
        roles: ['admin'],
        // owner: CheckOwner
        
    },
    view: {
        roles: ['admin'],
    }

}

export default cartPermissions