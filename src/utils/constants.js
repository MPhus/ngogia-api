import { ObjectId } from 'mongodb'
import { env } from '~/config/environment'
export const WHITELIST_DOMAIN = [
	'http://localhost:5173',
	'https://ngogia-web.vercel.app',
	'https://49fa-2402-800-6343-ec8-35b5-2ecb-6da0-e9d3.ngrok-free.app'
]
export const PRODUCT_TYPE = {
	TOP: 'top',
	BOTTOM: 'bottom'
}
export const PAY_METHOD = {
	ZALOPAY: 'zaloPay',
	CASH: 'cash'
}
export const EMAIL_REGEX = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const EMPTY_DATA = {
	thumb: 'https://res.cloudinary.com/dwa6hiofs/image/upload/v1723884187/upload_wt1avg.jpg',
	title: 'Tiêu đề của bài viết',
	content: 'Nội dung bài viết',
	description: 'Mô tả bài viết',
	heading: 'Tiêu đề phụ của bài viết'
}
export const RENDER_EMPTY_PRODUCT_LIST = (webId) => {
	return [
		{
			color: 'red',
			description: 'Mô tả về sản phẩm',
			material: 'Chất liệu của sản phẩm',
			name: 'Tên sản phẩm',
			price: 100,
			quantity: 1,
			savePercent: 0,
			size: 'l',
			sold: 0,
			supplier: 'Thương hiệu của sản phẩm ',
			thumb: EMPTY_DATA.thumb,
			type: 'top',
			webId: new ObjectId(webId),
			barcode: webId,
			createdAt: new Date(),
			updatedAt: null
		},
		{
			color: 'red',
			description: 'Mô tả về sản phẩm',
			material: 'Chất liệu của sản phẩm',
			name: 'Tên sản phẩm',
			price: 100,
			quantity: 1,
			savePercent: 0,
			size: 'l',
			sold: 0,
			supplier: 'Thương hiệu của sản phẩm ',
			thumb: EMPTY_DATA.thumb,
			type: 'top',
			webId: new ObjectId(webId),
			barcode: webId,
			createdAt: new Date(),
			updatedAt: null
		},
		{
			color: 'red',
			description: 'Mô tả về sản phẩm',
			material: 'Chất liệu của sản phẩm',
			name: 'Tên sản phẩm',
			price: 100,
			quantity: 1,
			savePercent: 0,
			size: 'l',
			sold: 0,
			supplier: 'Thương hiệu của sản phẩm ',
			thumb: EMPTY_DATA.thumb,
			type: 'top',
			webId: new ObjectId(webId),
			barcode: webId,
			createdAt: new Date(),
			updatedAt: null
		},
		{
			color: 'red',
			description: 'Mô tả về sản phẩm',
			material: 'Chất liệu của sản phẩm',
			name: 'Tên sản phẩm',
			price: 100,
			quantity: 1,
			savePercent: 0,
			size: 'l',
			sold: 0,
			supplier: 'Thương hiệu của sản phẩm ',
			thumb: EMPTY_DATA.thumb,
			type: 'top',
			webId: new ObjectId(webId),
			barcode: webId,
			createdAt: new Date(),
			updatedAt: null
		},
		{
			color: 'red',
			description: 'Mô tả về sản phẩm',
			material: 'Chất liệu của sản phẩm',
			name: 'Tên sản phẩm',
			price: 100,
			quantity: 1,
			savePercent: 0,
			size: 'l',
			sold: 0,
			supplier: 'Thương hiệu của sản phẩm ',
			thumb: EMPTY_DATA.thumb,
			type: 'bottom',
			webId: new ObjectId(webId),
			barcode: webId,
			createdAt: new Date(),
			updatedAt: null
		},
		{
			color: 'red',
			description: 'Mô tả về sản phẩm',
			material: 'Chất liệu của sản phẩm',
			name: 'Tên sản phẩm',
			price: 100,
			quantity: 1,
			savePercent: 0,
			size: 'l',
			sold: 0,
			supplier: 'Thương hiệu của sản phẩm ',
			thumb: EMPTY_DATA.thumb,
			type: 'bottom',
			webId: new ObjectId(webId),
			barcode: webId,
			createdAt: new Date(),
			updatedAt: null
		},
		{
			color: 'red',
			description: 'Mô tả về sản phẩm',
			material: 'Chất liệu của sản phẩm',
			name: 'Tên sản phẩm',
			price: 100,
			quantity: 1,
			savePercent: 0,
			size: 'l',
			sold: 0,
			supplier: 'Thương hiệu của sản phẩm ',
			thumb: EMPTY_DATA.thumb,
			type: 'bottom',
			webId: new ObjectId(webId),
			barcode: webId,
			createdAt: new Date(),
			updatedAt: null
		},
		{
			color: 'red',
			description: 'Mô tả về sản phẩm',
			material: 'Chất liệu của sản phẩm',
			name: 'Tên sản phẩm',
			price: 100,
			quantity: 1,
			savePercent: 0,
			size: 'l',
			sold: 0,
			supplier: 'Thương hiệu của sản phẩm ',
			thumb: EMPTY_DATA.thumb,
			type: 'bottom',
			webId: new ObjectId(webId),
			barcode: webId,
			createdAt: new Date(),
			updatedAt: null
		}
	]
}
