const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	],
	username: {
		type: String,
		required: true,
		unique: true,
		minLength: 3
	},
	name: String,
	passwordHash: String,
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
	transform: (document, returnedObejct) => {
		returnedObejct.id = returnedObejct._id.toString()
		delete returnedObejct._id
		delete returnedObejct.__v
		delete returnedObejct.passwordHash
	}
})

const User = mongoose.model('User', userSchema)

module.exports = User