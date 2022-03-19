const bcrypt = require('bcrypt');

const hashPass = async (password) => {
	try {
		const saltround = Number(process.env.SALT);
		const salt = await bcrypt.genSalt(saltround);
		return await bcrypt.hash(password, salt);
	} catch (err) {
		console.log(err);
	}
	return null;
};

const comparePass = async (password, hashedPass) => {
	try {
		return await bcrypt.compare(password, hashedPass);
	} catch (err) {
		console.log(err);
	}
	return null;
};

module.exports = { hashPass, comparePass };
