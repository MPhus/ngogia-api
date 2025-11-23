import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { brandService } from '~/services/brandService'
import { slideService } from '~/services/slideService'
const createNew = async (req, res, next) => {
	try {
		const data = {
			...req.body,
			thumb: req.file.path || ''
		}
		const slide = await brandService.createNew(data)
		res.status(StatusCodes.OK).json(slide)
	} catch (error) {
		next(error)
	}
}


const getAll = async (req, res, next) => {
	try {
		const brandList = await brandService.getAll()
		const slide = await slideService.getSlideByPage('brand')
		res.status(StatusCodes.OK).json({ brandList, slide })
	} catch (error) {
		next(error)
	}
}
const getById = async (req, res, next) => {
	try {
		const brand = await brandService.getById(req.params.id)
		res.status(StatusCodes.OK).json(brand)
	} catch (error) {
		next(error)
	}
}
export const brandController = {
	createNew,
	getAll,
	getById
}
