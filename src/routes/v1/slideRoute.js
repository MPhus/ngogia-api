import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { upload } from '~/config/cloudinary'
import { pageController } from '~/controllers/pageController'
import { slideController } from '~/controllers/slideController'

const Router = express.Router()

Router.route('/')
	.get((req, res) => {
		res.status(StatusCodes.OK).json({ message: 'GET' })
	})
	.post(upload.single('thumb'), slideController.createNew)
	.put(upload.single('thumb'), slideController.update)
Router.route('/:page')
	.get(slideController.getSlideByPage)


export const slideRoute = Router
