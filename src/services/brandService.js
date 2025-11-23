
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { deleteOnCoudinary } from '~/config/cloudinary'
import { env } from '~/config/environment'
import { brandModel } from '~/models/brandModel'
const createNew = async (data) => {
	try {
		const test = await brandModel.createNew(data)
		return test
	} catch (error) {
		throw new Error(error)
	}
}

const getAll = async () => {
	try {
		const test = await brandModel.getAll()
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getById = async (id) => {
	try {
		const brand = await brandModel.getById(id)
		return brand
	} catch (error) {
		throw new Error(error)
	}
}
export const brandService = {
	createNew,
	getAll,
	getById
}