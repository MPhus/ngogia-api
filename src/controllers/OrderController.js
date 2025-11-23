import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import nodemailer from 'nodemailer'
import { JwtProvider } from '~/providers/JwtProvider'
import ApiError from '~/utils/ApiError'
import { orderService } from '~/services/OrderService'
import { productService } from '~/services/productService'

const createNew = async (req, res, next) => {
	try {
		const dataSendmail = { ...req.body }
		const dataSaveDatabase = { ...dataSendmail, productList: dataSendmail.productList.map(item => { return { productID: item._id, quantity: item.quantityInCart } }) }

		const emailToken = await JwtProvider.generateToken(dataSaveDatabase, env.ORDER_TOKEN_SECRET_SIGNATURE, '300s')
		const test2 = `http://${env.LOCAL_DEV_HOST}:${env.LOCAL_DEV_FORNTEND_PORT}/verifyMail/${emailToken}`
		const htmlMail = dataSendmail.productList.map((item) => {
			return `
			<div style="min-width:320px; max-width: 320px;padding:8px 20px" >
				<h3 style="text-align: center;">${item.name}</h3>
				<img style="min-width:320px; max-width: 320px;" src=${item.thumb} alt=${item.name} />
				<h3>Giá thành: ${new Intl.NumberFormat().format(item.price * 1000)} vnd</h3>
				<h3>Số lượng: ${item.quantityInCart}</h3>
			</div>
			`
		}).join('')

		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			auth: {
				user: env.EMAIL,
				pass: env.APP_PASSWORK
			}
		})

		const mailOption = {
			from: {
				name: 'Ngô Gia Sắc Ngọc',
				address: env.EMAIL
			},
			to: dataSendmail.info.email,
			subject: 'Xác nhận đơn hàng',
			html: `
			<h1>Đơn hàng của bạn đã đặt thành công</h1>
			<div style=" color:#000 !important; padding: 20px;">
			<h2>Thông tin về đơn hàng</h2>
				<div style="gap:20px;  justify-content: space-around;">
				<h1></h1>
				${htmlMail}
				</div>
				<div style="display: flex; box-sizing: border-box;">
					<div style="margin-right: 40px;">
						<h2>
						Giá trị đơn hàng: ${new Intl.NumberFormat().format((dataSendmail.totalPrice * 1000))} VND
						</h2>
						<h3>
						Phí vận chuyển: ${new Intl.NumberFormat().format((dataSendmail.tranportFee * 1000))} VND
						</h3>
						<h1>
						Tổng cộng: ${new Intl.NumberFormat().format(((dataSendmail.totalPrice + dataSendmail.tranportFee) * 1000))} VND
						</h1>
					</div>

					<a href=${test2}
					style="background-color: #ca1a75; color: #fff; padding: 20px; margin-top: 40px; line-height: 40px; text-decoration: none; font-size: large; font-weight: 700; max-height: 40px;">Click
					vào đây
					để xác
					nhận đơn hàng của
					bạn</a>
				</div>
			</div>
			`
		}

		const test3 = await transporter.sendMail(mailOption)
		if (!test3) throw new ApiError(StatusCodes.NOT_FOUND, 'Error')
		// const createdOrder = await webService.createNew(req.body)

		res.status(StatusCodes.OK).json(test3.envelope)


	}
	catch (err) {
		next(err)
	}
}

const verifyOrder = async (req, res, next) => {
	try {
		const orderTokenDecoded = await JwtProvider.verifyToken(req.query.token, env.ORDER_TOKEN_SECRET_SIGNATURE)
		// if (orderTokenDecoded) res.status(StatusCodes.CREATED).json({ data: orderTokenDecoded, message: 'Is valid' })
		if (!orderTokenDecoded) throw new ApiError(StatusCodes.UNAUTHORIZED, 'Error')
		JwtProvider.revokeToken(req.query.token)
		const orderCreated = await orderService.createNew(orderTokenDecoded)

		if (!orderCreated) throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found')

		// const newProduct = await productService.update(orderTokenDecoded.productList)
		// if (!newProduct) throw new ApiError(StatusCodes.NOT_FOUND, 'Product not found in controler')
		// res.status(StatusCodes.CREATED).json(orderCreated)
		res.status(StatusCodes.CREATED).json({ data: orderTokenDecoded, message: 'Is valid' })
	} catch (error) {
		next(error)
	}
}
export const orderControler = {
	createNew,
	verifyOrder
}
