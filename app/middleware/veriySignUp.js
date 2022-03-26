const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkEmail = async (req, res, next) =>
{
	try {
		let user = await User.findOne({email: req.body.email });
		if (user) return res.status(400).send({message: "User already exists"});
		next();

	} catch (e) {
	
		return res.status(500).send({ message: "Cannot validate email"});
	}
}


checkUsername = async (req, res, next) =>
{
	try {
		let user = await User.findOne({username: req.body.username });
		if (user) return res.status(400).send({message: "User already exists"});
		next();

	} catch (e) {
	
		return res.status(500).send({ message: "Cannot validate username"});
	}
}

checkRole = async (req, res, next) =>
{
	if (req.body.role) {
	
		if ( !ROLES.includes(req.body.role) ) return res.status(400).send({ message: "User cannot have this role" });
		next();
	}
}

const verifySignUp = {
	checkEmail,
	checKUsername,
	checkRole
};

module.exports = verifySignUp; 










