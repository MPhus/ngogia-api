import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { productService } from '~/services/productService'
import { slideService } from '~/services/slideService'
import ApiError from '~/utils/ApiError'
const createNew = async (req, res, next) => {
	try {
		const data = {
			...req.body,
			thumb: req.file.path || ''
		}
		const slide = await slideService.createNew(data)
		res.status(StatusCodes.OK).json(slide)
	} catch (error) {
		next(error)
	}
}
const getSlideByPage = async (req, res, next) => {
	try {

		const slide = await slideService.getSlideByPage(req.param.pageId)
		res.status(StatusCodes.OK).json(slide)
	} catch (error) {
		next(error)
	}
}
const getHotProduct = async (req, res, next) => {
	try {
		const slide = await productService.getHotProduct()
		res.status(StatusCodes.OK).json(slide)

	} catch (error) {
		next(error)
	}
}
const getProductById = async (req, res, next) => {
	try {
		const product = await productService.getProductById(req.params.id)
		res.status(StatusCodes.OK).json(product)

	} catch (error) {
		next(error)
	}
}
const getProductByPage = async (req, res, next) => {
	try {
		const { price, brandId, uses, searchtext, isGetSoldOut } = req.query
		const filterObj = {
			price, brandId, uses, searchtext
		}
		const page = req.query.page * 1
		const limit = req.query.limit * 1

		const resuil = await productService.getProductByPage(page, limit, filterObj)
		res.status(StatusCodes.OK).json(resuil)

	}
	catch (err) {
		next(err)
	}
}
export const productController = {
	createNew,
	getHotProduct,
	getSlideByPage,
	getProductByPage,
	getProductById
}
