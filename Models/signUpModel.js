const mongoose = require('mongoose');

// 0 - admin , 1 - view home , 2 - view about , 3 - view profile , 4 - view contact , 5 - edit own profile ,

const signUpTemplate = new mongoose.Schema({
	userName: {
		type: String,
		trim: true,
		required: true,
		// required: 'Username cannot be empty',
	},
	email: {
		type: String,
		required: true,
		// required: "Email cannot be empty",
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		// required: 'Password cannot be empty',
	},
	permission: {
		type: Array,
		default: [],
	},
	createAt: {
		type: Date,
		default: Date.now,
		immutable: true,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	string1: {
		type: String,
		default: 'xyz',
	},
	string2: {
		type: String,
		default: 'xyz',
	},
});

signUpTemplate.methods.greetUser = function () {
	console.log(`Hi ${this.userName}, You have successfully tested the api`);
};

signUpTemplate.statics.findByName = function (name) {
	return this.find({ userName: new RegExp(name, 'i') });
};

signUpTemplate.query.whereName = function (name) {
	return this.where({ userName: new RegExp(name, 'i') });
};

signUpTemplate.virtual('virtualFunc').get(function (name) {
	return `${this.userName} has email: ${this.email}`;
});

signUpTemplate.pre('save', function (next) {
	this.updatedAt = Date.now();
	next();
});

module.exports = mongoose.model('users', signUpTemplate);
// 1st parameter is the name of the table in the database. This will be the name that should be changed in the .env file
// 2nd paramter is the object of how to table structure should be
