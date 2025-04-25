import {Router} from 'express'
import {getUsers,getUser} from '../controllers/user.controller.js'
import authorize from '../middlewares/auth.middlware.js'

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.get('/:id',authorize,getUser)

export default userRouter