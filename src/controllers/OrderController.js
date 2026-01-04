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
		const test2 = `${process.env.FRONTEND_HOST}/verifyMail/${emailToken}`
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
const createNoPrice = async (req, res, next) => {
	try {
		const dataSendmail = { ...req.body }
		// const dataSaveDatabase = { ...dataSendmail, productList: dataSendmail.productList.map(item => { return { productID: item._id, quantity: item.quantityInCart } }) }

		// const emailToken = await JwtProvider.generateToken(dataSaveDatabase, env.ORDER_TOKEN_SECRET_SIGNATURE, '300s')
		// const test2 = `${process.env.FRONTEND_HOST}/verifyMail/${emailToken}`
		const htmlMail = dataSendmail.productList.map((item) => {
			return `
  <tr>
    <td style="padding:15px 0;border-bottom:1px solid #eee;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="120" style="vertical-align:top;">
            <img 
              src="${item.thumb}" 
              alt="${item.name}"
              style="width:120px;max-width:120px;border-radius:6px;border:1px solid #eee;"
            />
          </td>
          <td style="padding-left:15px;vertical-align:top;">
            <h3 style="margin:0 0 6px;font-size:16px;color:#222;">
              ${item.name}
            </h3>
            <p style="margin:0;font-size:14px;color:#555;">
              Số lượng: <strong>${item.quantityInCart}</strong>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
  `
		}).join('')
		const htmlMailAdmin = dataSendmail.productList.map((item) => {
			return `
  <tr>
    <td style="padding:12px 0;border-bottom:1px dashed #ddd;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="90" style="vertical-align:top;">
            <img 
              src="${item.thumb}" 
              alt="${item.name}"
              style="width:90px;border-radius:4px;border:1px solid #eee;"
            />
          </td>
          <td style="padding-left:12px;vertical-align:top;">
            <p style="margin:0;font-size:14px;color:#111;">
              <strong>${item.name}</strong>
            </p>
            <p style="margin:4px 0 0;font-size:13px;color:#555;">
              SL: ${item.quantityInCart}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
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
  <div style="background:#f6f6f6;padding:20px 0;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;">
            
            <!-- HEADER -->
            <tr>
              <td style="padding:20px;text-align:center;background:#fce4ec;">
                <h1 style="margin:0;font-size:22px;color:#d81b60;">
                  Ngô Gia Sắc Ngọc
                </h1>
              </td>
            </tr>

            <!-- INFO -->
            <tr>
              <td style="padding:20px;color:#333;">
                <p><strong>Họ tên:</strong> ${dataSendmail.info.fullname}</p>
                <p><strong>Email:</strong> ${dataSendmail.info.email}</p>
                <p><strong>Số điện thoại:</strong> ${dataSendmail.info.phone}</p>
                <p><strong>Tỉnh/Thành:</strong> ${dataSendmail.info.city}</p>
                <p><strong>Quận/Huyện:</strong> ${dataSendmail.info.district}</p>
                <p><strong>Phường/Xã:</strong> ${dataSendmail.info.ward}</p>
                <p><strong>Ghi chú:</strong> ${dataSendmail.info.note || 'Không có'}</p>
              </td>
            </tr>

            <!-- MESSAGE -->
            <tr>
              <td style="padding:20px;background:#fafafa;">
                <p style="margin:0;font-size:15px;color:#333;">
                  ✅ <strong>Đơn hàng của bạn đã được đặt thành công.</strong><br/>
                  Chúng tôi sẽ sớm liên hệ và báo giá chi tiết cho bạn.
                </p>
              </td>
            </tr>

            <!-- ORDER LIST -->
            <tr>
              <td style="padding:20px;">
                <h2 style="margin:0 0 10px;font-size:18px;color:#222;">
                  Thông tin đơn hàng
                </h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${htmlMail}
                </table>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:15px;text-align:center;font-size:13px;color:#888;background:#f6f6f6;">
                © ${new Date().getFullYear()} Ngô Gia Sắc Ngọc
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `
		}
		const mailOptionAdmin = {
			from: {
				name: 'WEBSITE NGÔ GIA ',
				address: env.EMAIL
			},
			to: env.EMAIL_SELL,
			subject: 'XÁC NHẬN ĐƠN HÀNG MỚI',
			html: `
  <div style="background:#f2f4f7;padding:20px;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="650" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;">

            <!-- HEADER -->
            <tr>
              <td style="padding:18px;background:#5cb85c;color:#fff;">
                <h1 style="margin:0;font-size:20px;">
                   ĐƠN HÀNG MỚI
                </h1>
                <p style="margin:4px 0 0;font-size:14px;">
                  Có khách hàng vừa đặt hàng trên website
                </p>
              </td>
            </tr>

            <!-- CUSTOMER INFO -->
            <tr>
              <td style="padding:18px;">
                <h2 style="margin:0 0 10px;font-size:16px;color:#111;">
                  Thông tin khách hàng
                </h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:4px 0;"><strong>Họ tên:</strong> ${dataSendmail.info.fullname}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;"><strong>Email:</strong> ${dataSendmail.info.email}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;"><strong>Điện thoại:</strong> ${dataSendmail.info.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;">
                      <strong>Địa chỉ:</strong>
                      ${dataSendmail.info.ward}, ${dataSendmail.info.district}, ${dataSendmail.info.city}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:4px 0;"><strong>Ghi chú:</strong> ${dataSendmail.info.note || 'Không có'}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- ORDER -->
            <tr>
              <td style="padding:18px;background:#fafafa;">
                <h2 style="margin:0 0 10px;font-size:16px;color:#111;">
                  Sản phẩm đã đặt
                </h2>
                <table width="100%" cellpadding="0" cellspacing="0">
                  ${htmlMailAdmin}
                </table>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="padding:12px;text-align:center;font-size:12px;color:#777;background:#f2f4f7;">
                Email tự động từ hệ thống • Vui lòng không trả lời
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
  `
		}

		const test3 = await transporter.sendMail(mailOption)
		if (!test3) throw new ApiError(StatusCodes.NOT_FOUND, 'Error')
		const test4 = await transporter.sendMail(mailOptionAdmin)
		if (!test4) throw new ApiError(StatusCodes.NOT_FOUND, 'Error')
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
	verifyOrder,
	createNoPrice
}
