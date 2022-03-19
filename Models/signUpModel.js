const mongoose = require('mongoose');
const signUpTemplate = new mongoose.Schema({
	userName: {
		type: String,
		// trim: true,
		required: true,
		// required: 'Username cannot be empty',
	},
	email: {
		type: String,
		required: true,
		// required: "Email cannot be empty",
		// trim: true,
	},
	password: {
		type: String,
		required: true,
		// required: 'Password cannot be empty',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('users', signUpTemplate);
// 1st parameter is the name of the tabel in the database. This will be the name that should be changed in the .env file
// 2nd paramter is the object of how to table structure should be
