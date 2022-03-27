const router = require("express").Router();
const {jwtAuth} = require('../middleware');

router.get('/test', [jwtAuth.verifyToken], (req, res) => res.send({message: "Token veriied access granted to the test ressource."}) );


module.exports = router;