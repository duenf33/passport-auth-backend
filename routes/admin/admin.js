var express = require("express");
var router = express.Router();
var passport = require("passport");

var {
	signUp,
	login,
	updateProfile,
	getAllUsersProfile,
} = require("./controller/adminController");

router.post("/sign-up", signUp);
router.post("/login", login);

router.put(
	"/update-profile",
	passport.authenticate("admin-auth", { session: false }),
	updateProfile
);

router.get(
	"/get-all-users-profile",
	passport.authenticate("admin-auth", { session: false }),
	getAllUsersProfile
);

module.exports = router;
