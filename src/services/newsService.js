
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { deleteOnCoudinary } from '~/config/cloudinary'
import { env } from '~/config/environment'
import { slideModel } from '~/models/slideModel'
import { newsModel } from '~/models/newsModel'
const createNew = async (data) => {
	try {
		const test = await newsModel.createNew(data)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const createNewTest = async (data) => {
	try {
		const test = await newsModel.createNew(data)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getSlideByPage = async (pageId) => {
	try {
		const test = await slideModel.getSlideByPage(pageId)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getNewsById = async (id) => {
	try {
		const test = await newsModel.getNewsById(id)
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getHotNew = async (limit) => {
	try {
		const test = await newsModel.getHotNew(parseInt(limit))
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getOverview = async () => {
	try {
		const overview = await newsModel.getOverview()
		return overview
	} catch (error) {
		throw new Error(error)
	}
}
export const newsService = {
	createNew,
	getHotNew,
	getSlideByPage,
	getNewsById,
	createNewTest,
	getOverview
}