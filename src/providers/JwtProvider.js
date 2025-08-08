import JWT from 'jsonwebtoken'
const blacklistedTokens = new Set();

const revokeToken = (token) => {
	blacklistedTokens.add(token)
};

const isTokenRevoked = (token) => {
	return blacklistedTokens.has(token)
};
const generateToken = async (payload, privateKey, tokenLife) => {
	try {

		return JWT.sign(payload, privateKey, { algorithm: 'HS256', expiresIn: tokenLife })

	} catch (error) { throw new Error(error) }
}
const verifyToken = async (token, privateKey) => {
	try {
		if (isTokenRevoked(token)) {
			throw new Error('Token has been revoked')
		}
		const a = await JWT.verify(token, privateKey)
		return a

	} catch (error) {
		throw new Error(error)
	}
}

export const JwtProvider = {
	generateToken,
	verifyToken,
	revokeToken
}