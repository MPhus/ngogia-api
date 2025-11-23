import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { upload } from '~/config/cloudinary'
import { newsController } from '~/controllers/newsController'

const Router = express.Router()

Router.route('/')
	// .post(upload.single('thumb'), newsController.createNew)
	.post(upload.array('images', 10), newsController.createNewTest)
Router.route('/')
	.get(newsController.getHotNew)
Router.route('/overview')
	.get(newsController.getOverview)
Router.route('/:id')
	.get(newsController.getNewsById)
export const newsRoute = Router
