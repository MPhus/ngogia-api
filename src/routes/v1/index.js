import express from 'express'
import { StatusCodes } from 'http-status-codes'
const Router = express.Router()

Router.get('/status', (req, res) => {
	res.status(StatusCodes.OK).json({ message: 'Index.js' })
})
export const APIs_V1 = Router
