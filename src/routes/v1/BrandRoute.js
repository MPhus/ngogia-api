import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { upload } from '~/config/cloudinary'
import { brandController } from '~/controllers/brandController'

const Router = express.Router()

Router.route('/')
	.post(upload.single('thumb'), brandController.createNew)
Router.route('/')
	.get(brandController.getAll)
Router.route('/:id')
	.get(brandController.getById)
export const brandRoute = Router
