import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import CustomDate from '~/utils/customDate'
import bcrypt from 'bcrypt'
const USER_COLLECTION_NAME = 'users'
const INVALID_UPDATE_FIELDS = ['_id']

const checkValidEmail = async (email) => {
	try {
		const user = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
			email: email
		}) || null
		return user

	} catch (error) {
		throw new Error(error)
	}
}

const createNew = async (data) => {
	const hashedPassword = await bcrypt.hash(data.password, 10)
	const dataSave = {
		...data,
		password: hashedPassword
	}
	try {
		const resuil = await GET_DB().collection(USER_COLLECTION_NAME).insertOne({ ...dataSave })
		const newId = resuil.insertedId
		const newUser = await GET_DB().collection(USER_COLLECTION_NAME).findOne(
			{ _id: newId }
		)
		return newUser
	} catch (error) {
		throw new Error(error)
	}
}

const getAllUser = async (startIndex, limit, filterObj) => {
	const query = {
		...filterObj.name !== '' ? { name: filterObj.name } : {},
		...filterObj.email !== '' ? { email: filterObj.email } : {},
		...(filterObj.searchtext ? {
			$or: [
				{ name: { $regex: filterObj.searchtext, $options: 'i' } },
				{ email: { $regex: filterObj.searchtext, $options: 'i' } }
			]
		} : {})
	}

	try {
		const result = await GET_DB().collection(USER_COLLECTION_NAME).find(query).sort({ createAt: 1 }).limit(limit).skip(startIndex).toArray()

		const totalUserForType = await filterUser(filterObj)
		const totalUser = totalUserForType.length
		const totalPage = Math.ceil(totalUser / limit)

		return { totalUser, totalPage, data: result || null }

	} catch (error) {
		throw new Error(error)
	}
}
const filterUser = async (filterObj) => {
	try {
		return await GET_DB().collection(USER_COLLECTION_NAME).find({
			...filterObj.name !== '' ? { name: filterObj.name } : {},
			...filterObj.email !== '' ? { email: filterObj.email } : {},
			...(filterObj.searchtext ? {
				$or: [
					{ name: { $regex: filterObj.searchtext, $options: 'i' } },
					{ email: { $regex: filterObj.searchtext, $options: 'i' } }
				]
			} : {})
		}).toArray()

	} catch (error) {
		throw new Error(error)
	}
}
const getUserById = async (id) => {
	try {
		return await GET_DB().collection(USER_COLLECTION_NAME).findOne({
			_id: new ObjectId(id)
		}) || null

	} catch (error) {
		throw new Error(error)
	}
}
const deleteUser = async (id) => {
	try {
		return await GET_DB().collection(USER_COLLECTION_NAME).deleteOne({
			_id: new ObjectId(id)
		})
	} catch (error) {
		throw new Error(error)
	}
}
const updateDetail = async (data) => {
	const { _id } = data
	Object.keys(data).forEach(field => {
		if (INVALID_UPDATE_FIELDS.includes(field)) {
			delete data[field]
		}
	})

	const result = await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate(
		{
			_id: new ObjectId(_id)
		},
		{ $set: data },
		{ returnDocument: 'after' }
	)
	return result
}

const createNewWeb = async (data) => {
	const hashedPassword = await bcrypt.hash(data.password, 10)
	const dataSave = {
		...data,
		password: hashedPassword
	}
	try {
		const resuil = await GET_DB().collection(USER_COLLECTION_NAME).insertOne({ ...dataSave })
		const newId = resuil.insertedId
		const newUser = await GET_DB().collection(USER_COLLECTION_NAME).findOne(
			{ _id: newId }
		)
		return newUser
	} catch (error) {
		throw new Error(error)
	}
}
export const userModel = {
	checkValidEmail,
	getAllUser,
	createNew,
	getUserById,
	deleteUser,
	updateDetail,
	createNewWeb
}
