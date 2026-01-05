import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_MESSAGE } from '~/utils/validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
const PRODUCT_COLLECTION_NAME = 'products'

const SLIDE_COLLECTION_SCHEMA = Joi.object({
	pageId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_MESSAGE),
	heading: Joi.string().max(256).trim().strict(),
	title: Joi.string().required().min(3).max(50).trim().strict(),
	content: Joi.string().required().min(3).trim().strict(),
	thumb: Joi.string().required()

})
const createNew = async (data) => {
	try {
		const resuil = await GET_DB().collection(PRODUCT_COLLECTION_NAME)
			.insertOne({
				...data,
				pageId: new ObjectId(data.pageId)
			})
		return resuil.insertedId.toString()
	} catch (error) {
		throw new Error(error)

	}
}
const getHotProduct = async () => {
	try {
		const resuil = await GET_DB().collection(PRODUCT_COLLECTION_NAME)
			.find({ isHotProduct: true })
			.toArray()
		return resuil[0]
	} catch (error) {
		throw new Error(error)

	}
}
const getProductById = async (id) => {
	try {
		const resuil = await GET_DB().collection(PRODUCT_COLLECTION_NAME)
			.findOne({ _id: new ObjectId(id) })
		return resuil
	} catch (error) {
		throw new Error(error)

	}
}
const buildQuery = (filterObj) => ({
	...filterObj.brandId !== '' ? { brandId: new ObjectId(filterObj.brandId) } : {},
	...filterObj.uses !== '' ? { uses: filterObj.uses } : {},
	...(filterObj.searchtext ? {
		$or: [
			{ name: { $regex: filterObj.searchtext, $options: 'i' } },
			{ title: { $regex: filterObj.searchtext, $options: 'i' } },
			{ uses: { $regex: filterObj.searchtext, $options: 'i' } }
		]
	} : {}),
	...(filterObj.isGetSoldOut === 'true' ? {} : { quantity: { $gt: 0 } })
})
// isGetSoldOut
const getProductByPage = async (startIndex, limit, filterObj) => {
	const query = buildQuery(filterObj)
	try {
		let result = []
		if (filterObj.price === 'increase' || filterObj.price === 'decrease') {
			const sortOption =
				filterObj.price === 'increase'
					? { price: 1 }
					: { price: -1 }

			result = await GET_DB()
				.collection(PRODUCT_COLLECTION_NAME)
				.find(query)
				.sort(sortOption)
				.skip(startIndex)
				.limit(limit)
				.toArray()
		}

		else if (filterObj.price === 'latest') {
			result = await GET_DB()
				.collection(PRODUCT_COLLECTION_NAME)
				.aggregate([
					{ $match: query },
					{
						$addFields: {
							nameOrder: {
								$cond: [
									{ $regexMatch: { input: '$name', regex: /^[A-Za-z]/ } },
									0,
									1
								]
							}
						}
					},
					{ $sort: { nameOrder: 1, name: 1 } },
					{ $skip: startIndex },
					{ $limit: limit },
					{ $project: { nameOrder: 0 } }
				])
				.toArray()
		}

		const totalProduct = await GET_DB().collection(PRODUCT_COLLECTION_NAME).countDocuments(buildQuery(filterObj))
		const totalPage = Math.ceil(totalProduct / limit)

		return { totalProduct, totalPage, data: result || null }

	} catch (error) {
		throw new Error(error)
	}
}
export const productModel = {
	createNew,
	getHotProduct,
	getProductByPage,
	getProductById
}