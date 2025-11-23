/* eslint-disable no-useless-catch */

import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { deleteOnCoudinary } from '~/config/cloudinary'
import { env } from '~/config/environment'
import { slideModel } from '~/models/slideModel'
import { prodctModel, productModel } from '~/models/productModel'
const createNew = async (data) => {
	try {
		const test = await slideModel.createNew(data)
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
const getHotProduct = async () => {
	try {
		const test = await productModel.getHotProduct()
		return test
	} catch (error) {
		throw new Error(error)
	}
}
const getProductById = async (id) => {
	try {
		const product = await productModel.getProductById(id)
		return product
	} catch (error) {
		throw new Error(error)
	}
}

const getProductByPage = async (page, limit, filterObj) => {
	try {
		const startIndex = (page - 1) * limit

		const data = await productModel.getProductByPage(startIndex, limit, filterObj)

		if (!data) throw new ApiError(StatusCodes.NOT_FOUND, 'Products not found!')
		const product = { maxProductOfPage: limit, page, ...data }


		return product

	} catch (error) {
		throw error
	}
}


export const productService = {
	createNew,
	getHotProduct,
	getSlideByPage,
	getProductByPage,
	getProductById
}