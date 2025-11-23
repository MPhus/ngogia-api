import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { slideService } from '~/services/slideService'
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

		const slide = await slideService.getSlideByPage(req.param.page)
		res.status(StatusCodes.OK).json(slide)
	} catch (error) {
		next(error)
	}
}
const update = (req, res, next) => {
	try {
		console.log(' req: ', req)

	} catch (error) {
		next(error)
	}
}
export const slideController = {
	createNew,
	update,
	getSlideByPage
}
