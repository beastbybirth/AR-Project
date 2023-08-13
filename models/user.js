var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		default: "",
	},
	students: {
		type: Object,
		trim: true,
		default: {}
	},
	teachers: {
		type: Object,
		trim: true,
		default: {}
	}
}),
userSchema.plugin(uniqueValidator);
User = mongoose.model('User', userSchema);

module.exports = User;