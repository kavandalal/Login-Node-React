const express = require('express');
const router = express.Router();
const signUpTemplate = require('../Models/signUpModel');
const { hashPass, comparePass } = require('../Utils/passHash');

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
				res.json(data);
			})
			.catch((err) => res.json(err));
	}
});

router.post('/signin', async (req, res) => {
	const ans = await signUpTemplate.find({ email: req.body.email });
	const { email, password } = req.body;
	if (ans.length == 0) {
		res.json({ status: 'error', msg: 'Email does not exist' });
	} else if (ans[0].email == email && (await comparePass(password, ans[0].password))) {
		res.status(200);
		res.json({ status: 'sucess', msg: 'Success' });
	} else {
		// res.status(400);
		res.json({ status: 'error', msg: 'Password Incorrect' });
	}
});

router.get('/test', async (req, res) => {
	res.json({ msg: 'Working successfully' });
});

module.exports = router;
