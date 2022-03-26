const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();

//config database
const db = require("./app/models");
const Role = db.role;
db.sequelize.sync({force:true})
.then(() => {
	initial();
	console.log("Sync db");
});

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( {extended:true} ));
app.use(
	cookieSession({
		name: "auth-session",
		secret: require("./app/conig/auth").secret,
		httpOnly: true
	})
);

//example route
app.get("/", (req, res) => res.json("Welcome to authenticator API") );


function initial()
{
	Role.create({
		id: 1,
		name: "admin"
	});

	Role.create({
		id: 1,
		name: "user"
	});
}

//Config
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`) );
