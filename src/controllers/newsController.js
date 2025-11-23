import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { newsService } from '~/services/newsService'
const createNew = async (req, res, next) => {
	try {
		const data = {
			...req.body,
			thumb: req.file.path || ''
		}
		const slide = await newsService.createNew(data)
		res.status(StatusCodes.OK).json(slide)
	} catch (error) {
		next(error)
	}
}
const createNewTest = async (req, res, next) => {
	try {
		const images = req.files?.map(img => img.path)
		const data = {
			...req.body,
			images,
			thumb: images[0]
		}
		const slide = await newsService.createNewTest(data)
		res.status(StatusCodes.OK).json(slide)
	} catch (error) {
		next(error)
	}
}
const getSlideByPage = async (req, res, next) => {
	try {

		const slide = await newsService.getSlideByPage(req.param.pageId)
		res.status(StatusCodes.OK).json(slide)
	} catch (error) {
		next(error)
	}
}
const getNewsById = async (req, res, next) => {
	try {

		const slide = await newsService.getNewsById(req.params.id)
		res.status(StatusCodes.OK).json(slide)
	} catch (error) {
		next(error)
	}
}
const getOverview = async (req, res, next) => {
	try {

		const overview = await newsService.getOverview()
		res.status(StatusCodes.OK).json(overview)
	} catch (error) {
		next(error)
	}
}
const getHotNew = async (req, res, next) => {
	try {
		const hotNews = await newsService.getHotNew(req.query.limit)
		res.status(StatusCodes.OK).json(hotNews)
	} catch (error) {
		next(error)
	}
}
export const newsController = {
	createNew,
	getHotNew,
	getSlideByPage,
	getNewsById,
	createNewTest,
	getOverview
}
