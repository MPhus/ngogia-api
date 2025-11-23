import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
const PAGE_COLLECTION_NAME = 'pages'

const SLIDE_COLLECTION_SCHEMA = Joi.object({
	pageId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_MESSAGE),
	heading: Joi.string().max(256).trim().strict(),
	title: Joi.string().required().min(3).max(50).trim().strict(),
	content: Joi.string().required().min(3).trim().strict(),
	thumb: Joi.string().required()

})
const createNew = async (data) => {
	try {
		const resuil = await GET_DB().collection(PAGE_COLLECTION_NAME)
			.insertOne({
				...data,
				pageId: new ObjectId(data.pageId)
			})
		return resuil.insertedId.toString()
	} catch (error) {
		throw new Error(error)

	}
}

const getBySlug = async (slug) => {
	try {
		const resuil = await GET_DB().collection(PAGE_COLLECTION_NAME)
			.findOne({
				name: slug
			})

		return resuil
	} catch (error) {
		throw new Error(error)

	}
}

const getInfo = async () => {
	try {
		const resuil = await GET_DB().collection(PAGE_COLLECTION_NAME)
			.findOne({
				justInfo: true
			})

		return resuil
	} catch (error) {
		throw new Error(error)

	}
}
export const pageModel = {
	createNew,
	getBySlug,
	getInfo
}