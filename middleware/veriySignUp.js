const db = require("../app/models");
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


const verifySignUp = {
	checkEmail,
	checKUsername,
};

module.exports = verifySignUp; 










