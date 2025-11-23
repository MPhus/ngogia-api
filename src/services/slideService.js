
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { deleteOnCoudinary } from '~/config/cloudinary'
import { env } from '~/config/environment'
import { slideModel } from '~/models/slideModel'
const createNew = async (data) => {
	try {
		const test = await slideModel.createNew(data)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getSlideByPage = async (page) => {
	try {
		const test = await slideModel.getSlideByPage(page)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const update = async (data) => {
	try {
		const test = await slideModel.createNew(data)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
export const slideService = {
	createNew,
	update,
	getSlideByPage
}