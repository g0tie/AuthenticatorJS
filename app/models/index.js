//INITILIAZE SEQUELIZE ORM

const config = require("../config/db.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: config.dialect,
		operatorsAliases: false
	}

);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User.js")(sequelize, Sequelize);
db.role = require("./Role.js")(sequelize, Sequelize);i

db.role.hasMany(db.user); 
db.user.belongsTo(db.role); 

db.ROLES = ["user", "admin"];

module.exports = db;








