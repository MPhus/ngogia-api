import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { pageService } from '~/services/pageService'
import { slideService } from '~/services/slideService'
import { productService } from '~/services/productService'
const createNew = (req, res, next) => {
	try {
		console.log(' req: ', req)

	} catch (error) {
		next(error)
	}
}
const getBySlug = async (req, res, next) => {
	try {
		const resuil = await pageService.getBySlug(req.params.slug)
		res.status(StatusCodes.OK).json(resuil)

	} catch (error) {
		next(error)
	}
}
const getInfo = async (req, res, next) => {
	try {
		const resuil = await pageService.getInfo()
		res.status(StatusCodes.OK).json(resuil)

	} catch (error) {
		next(error)
	}
}
const getHomePage = async (req, res, next) => {
	try {
		const homePage = await pageService.getBySlug('')
		if (!homePage) next()
		//getoverview
		const overview = await pageService.getBySlug('overview')
		if (!overview) next()

		//getHotProduct
		const hotProduct = await productService.getHotProduct()
		//getSlide

		res.status(StatusCodes.OK).json({ ...homePage, overview, hotProduct })

	} catch (error) {
		next(error)
	}
}
export const pageController = {
	createNew,
	getBySlug,
	getHomePage,
	getInfo
}
