const jwt = require("jsonwebtoken");
const config = require("../config/auth.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
	let token = req.session.token;

	if (!token) return res.status(403).send({message: "No token found"});
	
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) return res.status(403).send({message: "Unauthorized"});	
		
		req.userId = decoded.id;
		next();
	});

}

isAdmin = async (req, res, next) => {
	
	try {
		const user = await User.findByPk(req.userId);
		const role = user.getRole();
		if (role === "admin") return next();

		return res.status(403).send({message: "User is not a admin"});

	} catch (e) {
		return res.status(500).send({message: "Cannot validate role"});
	}

}

const jwtAuth = {
	verifyToken,
	isAdmin
};

module.exports = jwtAuth;
