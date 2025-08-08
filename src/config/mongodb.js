import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let ngogiaIntance = null

const clientIntance = new MongoClient(env.MONGODB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
})

export const CONNECT_DB = async () => {
	await clientIntance.connect()
	ngogiaIntance = clientIntance.db(env.DB_NAME)
}

export const CLOSE_DB = async () => {
	await clientIntance.close()
}

export const GET_DB = () => {
	if (!ngogiaIntance) throw new Error('Must connect to Database !!!')
	return ngogiaIntance
}