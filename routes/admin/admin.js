var express = require("express");
var router = express.Router();
var passport = require("passport");

var {
	signUp,
	login,
	updateProfile,
	getAllUsersProfile,
	createUserUsingAdminRoute,
	deleteUserByEmailUsingAdminRoute,
	updateUserByEmailUsingAdminRoute,
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

router.post(
	"/create-user-using-admin-route",
	passport.authenticate("admin-auth", { session: false }),
	createUserUsingAdminRoute
);

router.delete(
	"/delete-user-by-email-using-admin-route",
	passport.authenticate("admin-auth", { session: false }),
	deleteUserByEmailUsingAdminRoute
);

router.put(
	"/update-user-by-email-using-admin-route",
	passport.authenticate("admin-auth", { session: false }),
	updateUserByEmailUsingAdminRoute
)

module.exports = router;
