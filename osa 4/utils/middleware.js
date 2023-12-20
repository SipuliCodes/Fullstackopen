const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, req, res, next) => {
	if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(400).json({ error: 'token missing or invalid'})
	}

	next()
}

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		req.token = authorization.replace('Bearer ', '')
	}

	next()
}

const userExtractor = async (req, res, next) => {
	const token = req.token
	if (token) {
		const decodedToken = jwt.verify(req.token, process.env.SECRET)
		if (decodedToken.id) {
			const user = await User.findById(decodedToken.id)
			req.user = user
		}
	}

	next()
}


module.exports =
{
	errorHandler,
	tokenExtractor,
	userExtractor
}