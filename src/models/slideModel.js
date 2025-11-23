import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
const SLIDE_COLLECTION_NAME = 'slides'

const SLIDE_COLLECTION_SCHEMA = Joi.object({
	pageId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_MESSAGE),
	heading: Joi.string().max(256).trim().strict(),
	title: Joi.string().required().min(3).max(50).trim().strict(),
	content: Joi.string().required().min(3).trim().strict(),
	thumb: Joi.string().required()

})
const createNew = async (data) => {
	try {
		const resuil = await GET_DB().collection(SLIDE_COLLECTION_NAME)
			.insertOne({
				...data,
				pageId: new ObjectId(data.pageId)
			})
		return resuil.insertedId.toString()
	} catch (error) {
		throw new Error(error)

	}
}
const getSlideByPage = async (page) => {
	try {
		const resuil = await GET_DB().collection(SLIDE_COLLECTION_NAME)
			.findOne({
				page: page
			})
		return resuil
	} catch (error) {
		throw new Error(error)

	}
}

export const slideModel = {
	createNew,
	getSlideByPage
}