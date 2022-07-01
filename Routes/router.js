const express = require('express');
const router = express.Router();
const signUpTemplate = require('../Models/signUpModel');
const { hashPass, comparePass } = require('../Utils/passHash');
// const jwt

router.post('/signup', async (req, res) => {
	const ans = await signUpTemplate.find({ email: req.body.email });
	if (ans.length != 0) {
		res.json({ status: 'error', msg: 'Email already exist' });
	} else {
		//hash the password
		const pass = await hashPass(req.body.password);
		const signedUpUser = new signUpTemplate({
			userName: req.body.userName,
			email: req.body.email,
			password: pass,
		});
		signedUpUser
			.save()
			.then((data) => {
				res.status(201);
				res.json({ status: 'success', msg: 'Successfully added user', data: data });
			})
			.catch((err) => res.json(err));
	}
});

router.post('/signin', async (req, res) => {
	const ans = (await signUpTemplate.findOne({ email: req.body.email })) || [];
	const { email, password } = req.body;
	if (ans.length == 0) {
		res.json({ status: 'error', msg: 'Email does not exist' });
	} else if (ans.email == email && (await comparePass(password, ans.password))) {
		res.status(200).json({ status: 'success', msg: 'Success' });
	} else {
		// res.status(400);
		res.json({ status: 'error', msg: 'Password Incorrect' });
	}
});

router.get('/test', async (req, res) => {
	const user = await signUpTemplate.findByName('xyz').where({ email: 'xyz@gmail.com' }).select('userName');
	const user2 = await signUpTemplate.find().whereName('xyz').select('userName');
	const user3 = await signUpTemplate.findOne();
	user3.greetUser(); // custom function that will run for the instance
	// console.log(user);
	res.json({ msg: 'Working successfully' });
});
router.get('/allUser', async (req, res) => {
	// const users = await signUpTemplate.aggregate([
	// 	{
	// 		$project: {
	// 			email: 1,
	// 			userName: 1,
	// 			string1: 1,
	// 			string2: 1,
	// 			same: { $cmp: ['$string2', '$string1'] },
	// 		},
	// 	},
	// ]);
	const users = await signUpTemplate.find({ $string1: { $eq: '$string2' } });

	res.json({ allLength: users?.length || 0, data: users });
});

module.exports = router;

// xyz@gmail.com xyz
