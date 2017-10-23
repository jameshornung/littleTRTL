var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
	
}, { collection:'users'});

var User = mongoose.model('user', UserSchema);

module.exports = User;