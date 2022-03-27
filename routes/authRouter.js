const { veriySignUp } = require("../middleware");
const controller = require("../controllers/authController.js");
const router = require("express").Router();

router.post(
    '/signup', 
    [
        veriySignUp.checkEmail,
        veriySignUp.checkUsername,
    ], 
    controller.signup
);
router.post('/signin', controller.signin);
router.post('/signout', controller.signout);

module.exports = router;