const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
	const { username, password } = req.body;

	try {
		const hashPasswords = await bcrypt.hash(password, 12);
		const newUser = await User.create({ username, password: hashPasswords });
		req.session.user = newUser;
		res.status(201).json({ status: 'success', data: newUser });
	} catch (error) {
		res.status(400).json({ status: 'failed', error: error.message });
	}
};

exports.logIn = async (req, res) => {
	const { username, password } = req.body;

	try {
		const user = await User.findOne({ username });
		console.log(user);
		if (!user) {
			return res
				.status(404)
				.json({ status: 'failed', message: 'User not found' });
		}

		const verifyPasswords = await bcrypt.compare(password, user.password);
		if (verifyPasswords) {
			req.session.user = user;
			res.status(200).json({ status: 'success' });
		} else {
			res
				.status(400)
				.json({ status: 'failed', message: 'incorrect username or password' });
		}
	} catch (error) {
		res.status(400).json({ status: 'failed', error: error.message });
	}
};
