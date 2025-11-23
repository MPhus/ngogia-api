
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { deleteOnCoudinary } from '~/config/cloudinary'
import { env } from '~/config/environment'
import { slideModel } from '~/models/slideModel'
import { pageModel } from '~/models/pageModel'
const createNew = async (data) => {
	try {
		const test = await pageModel.createNew(data)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getBySlug = async (slug) => {
	try {
		const test = await pageModel.getBySlug(slug)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getInfo = async () => {
	try {
		const test = await pageModel.getInfo()
		return test
	} catch (error) {
		throw new Error(error)
	}
}
export const pageService = {
	createNew,
	getBySlug,
	getInfo
}