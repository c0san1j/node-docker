const protect = (req, res, next) => {
	const { user } = req.session;

	if (!user) {
		return res.status(401).json({ status: 'failed', message: 'unauthorized' });
	}

	req.user = user;

	next();
};

//only call protect without destruction
module.exports = protect;

// must use destruction
// exports.protect
