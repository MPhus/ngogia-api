import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { upload } from '~/config/cloudinary'
import { pageController } from '~/controllers/pageController'

const Router = express.Router()

Router.route('/')
	.get(pageController.getHomePage)
	.post(upload.array('thumb', 10), pageController.createNew)
Router.route('/:slug')
	.get(pageController.getBySlug)
Router.route('/info')
	.get(pageController.getInfo)


export const pageRoute = Router
