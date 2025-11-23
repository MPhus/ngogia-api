import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { upload } from '~/config/cloudinary'
import { productController } from '~/controllers/productController'
const Router = express.Router()

Router.route('/')
	.get(productController.getProductByPage)
Router.route('/:id')
	.get(productController.getProductById)

export const productRoute = Router
