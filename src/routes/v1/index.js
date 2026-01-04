import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { slideRoute } from './slideRoute'
import { pageRoute } from './PageRoute'
import { productRoute } from './ProductRoute'
import { newsRoute } from './NewsRoute'
import { brandRoute } from './BrandRoute'
import { orderRoute } from './OrderRoute'
import { pageService } from '~/services/pageService'
import { upload } from '~/config/cloudinary'
import { orderController } from '~/controllers/OrderController'
import { userRoute } from './userRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
	res.status(StatusCodes.OK).json({ message: 'Index.js' })
})

Router.get('/info', async (req, res, next) => {
	try {
		const resuil = await pageService.getInfo()
		res.status(StatusCodes.OK).json(resuil)

	} catch (error) {
		next(error)
	}
})
Router.use('/pages', pageRoute)
Router.use('/slides', slideRoute)
Router.use('/products', productRoute)
Router.use('/news', newsRoute)
Router.use('/brands', brandRoute)
Router.use('/order', orderRoute)
Router.use('/users', userRoute)
Router.post('/uploadTest', upload.array('thumb', 56), (req, res, next) => {
	try {
		res.status(StatusCodes.OK).json({ data: req.files })
	} catch (error) {
		next(error)
	}
})
export const APIs_V1 = Router
/**
* Paste one or more documents here
*/