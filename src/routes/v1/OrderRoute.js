import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { upload } from '~/config/cloudinary'
import { orderControler } from '~/controllers/OrderController'

const Router = express.Router()

Router.route('/')
	.post(orderControler.createNew)
Router.route('/verifyMail')
	.get(orderControler.verifyOrder)


export const orderRoute = Router
