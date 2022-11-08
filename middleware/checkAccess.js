

const checkAccess = (permission) => {
    return async (req, res, next) => {
        //checks roles in permission
        if(permission.roles.includes(req.user?.role)) {
            return next();
        }
        //checks if the owner is the userobject exists
        if(!permission.owner) {
            return res.status(401).json({success: false, message: "You are not authorized to perform this action"})

        }
        //checks if the owner is the user
        const isOwner = await permission.owner(req);
        if(isOwner === true) {
            return next();
        }
        if(isOwner === false) {
            return res.status(401).json({success: false, message: "You are not authorized to perform this action"})
        }
        return res.status(500).json({success: false, message: "Something went wrong"})
    }
}

export default checkAccess;