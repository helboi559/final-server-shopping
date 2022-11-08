import { Router } from "express";
import { fetchUsers, login, register, updateProfile } from "../controllers/user.js";
import checkAccess from "../middleware/checkAccess.js";
import userPermissions from "../middleware/permissions/user/userPermissions.js";
import auth from "../middleware/auth.js";

const userRouter = Router()
userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.patch('/updateProfile',auth,updateProfile)
userRouter.get('/all-users',auth, checkAccess(userPermissions.listUsers),fetchUsers)

export default userRouter