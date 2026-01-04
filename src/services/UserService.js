/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
import { maxForQuantityAndType } from '~/utils/sorts'
import { userModel } from '~/models/UserModel'
import bcrypt from 'bcrypt'


const checkValidEmail = async (email) => {
	try {

		const user = await userModel.checkValidEmail(email)

		return user

	} catch (error) {
		throw error
	}
}

const getAllUser = async (page, limit, filterObj) => {
	try {
		const startIndex = (page - 1) * limit

		const data = await userModel.getAllUser(startIndex, limit, filterObj)

		if (!data) throw new ApiError(StatusCodes.NOT_FOUND, 'Products not found!')
		const product = { maxProductOfPage: limit, page, ...data }


		return product

	} catch (error) {
		throw error
	}
}

const createNew = async (data) => {
	try {
		const user = await userModel.createNew(data)

		return user
	} catch (error) {
		throw error
	}
}
const getUserById = async (id) => {
	try {
		const user = await userModel.getUserById(id)

		return user
	} catch (error) {
		throw error
	}
}
const deleteUser = async (id) => {
	try {
		const user = await userModel.getUserById(id)
		await userModel.deleteUser(id)

		return { Deletemessage: 'Delete successfuly' }

	} catch (error) {
		throw error
	}
}
const updateDetailPasswork = async (data, passOnDB) => {
	try {
		let hashedPassword
		if (passOnDB === data.password) {
			hashedPassword = passOnDB
		} else {
			hashedPassword = await bcrypt.hash(data.password, 10)
		}
		let userDetail = {
			...data,
			password: hashedPassword
		}
		if (!data.password) {
			const user = await userModel.getUserById(data._id)
			userDetail = {
				...data,
				password: user.password
			}
		}
		const resuil = await userModel.updateDetail(userDetail)
		return resuil
	} catch (error) {
		throw error
	}
}
const updateDetail = async (data) => {
	try {
		const hashedPassword = await bcrypt.hash(data.password, 10)
		let userDetail = {
			...data,
			password: hashedPassword
		}
		if (!data.password) {
			const user = await userModel.getUserById(data._id)
			userDetail = {
				...data,
				password: user.password
			}
		}
		const resuil = await userModel.updateDetail(userDetail)

		return resuil

	} catch (error) {
		throw error
	}
}
export const userService = {
	checkValidEmail,
	getAllUser,
	createNew,
	getUserById,
	deleteUser,
	updateDetail,
	updateDetailPasswork
}
