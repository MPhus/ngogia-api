import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { upload } from '~/config/cloudinary'
import { brandController } from '~/controllers/brandController'
import { userController } from '~/controllers/userController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/')
	.get(userController.getAllUser)
	.post(userController.createNew)
	.put(userController.updateDetailPassword)
	.delete(userController.deleteUser)
Router.route('/login')
	.post(userController.login)
Router.route('/logout')
	.delete(userController.logout)
Router.route('/refresh_token')
	.put(userController.refreshToken)
Router.route('/accesstoken')
	.get(authMiddleware.isAuthorized, userController.accessToken)
export const userRoute = Router