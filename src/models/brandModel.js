import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
const BRANDS_COLLECTION_NAME = 'brands'

const NEWS_COLLECTION_SCHEMA = Joi.object({
	pageId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_MESSAGE),
	heading: Joi.string().max(256).trim().strict(),
	title: Joi.string().required().min(3).max(50).trim().strict(),
	content: Joi.string().required().min(3).trim().strict(),
	thumb: Joi.string().required()

})
const createNew = async (data) => {
	const newData = {
		...data,
		createAt: new Date()
	}
	try {
		const resuil = await GET_DB().collection(BRANDS_COLLECTION_NAME)
			.insertOne(newData)
		return resuil.insertedId.toString()
	} catch (error) {
		throw new Error(error)

	}
}
const getAll = async () => {
	try {
		const resuil = await GET_DB().collection(BRANDS_COLLECTION_NAME)
			.find({})
			.toArray()
		return resuil
	} catch (error) {
		throw new Error(error)

	}
}
const getById = async (id) => {
	console.log(' id: ', id)
	try {
		const resuil = await GET_DB().collection(BRANDS_COLLECTION_NAME)
			.findOne({
				_id: new ObjectId(id)
			})
		return resuil
	} catch (error) {
		throw new Error(error)

	}
}
export const brandModel = {
	createNew,
	getAll,
	getById
}