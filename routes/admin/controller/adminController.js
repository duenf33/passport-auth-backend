const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../../admin/model/Admin");
const User = require("../../users/model/User");

const signUp = async (req, res) => {
	try {
		let genSalt = await bcrypt.genSalt(12);
		let hashedPassword = await bcrypt.hash(req.body.password, genSalt);

		let createdAdmin = new Admin({
			email: req.body.email,
			username: req.body.username,
			password: hashedPassword,
		});
		let savedCreatedAdmin = await createdAdmin.save();
		res.json({
			message: "Admin has been created",
			admin: savedCreatedAdmin,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

const login = async (req, res) => {
	try {
		let foundAdmin = await Admin.findOne({ email: req.body.email });
		if (!foundAdmin) {
			throw { message: "Admin Not Found!  Please Go Sign Up!" };
		}
		let comparedPassword = await bcrypt.compare(
			req.body.password,
			foundAdmin.password
		);
		if (!comparedPassword) {
			throw { message: "Please check your admin email and password!" };
		}
		let jwtToken = jwt.sign(
			{
				email: foundAdmin.email,
				username: foundAdmin.username,
			},
			process.env.JWT_ADMIN_SECRET_STRING,
			{
				expiresIn: "1d",
			}
		);
		res.json({
			jwtToken,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

const updateProfile = async (req, res) => {
	try {
		res.json({
			message: " Update route success",
			user: req.user,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

const getAllUsersProfile = async (req, res) => {
	try {
		let allUsersProfile = await User.find({});

		res.json({
			message: "Got all users",
			users: allUsersProfile,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

const createUserUsingAdminRoute = async (req, res) => {
	try {
		let createdUser = new User({
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
		});

		let savedUser = await createdUser.save();

		res.json({
			message: "created user",
			user: savedUser,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

const deleteUserByEmailUsingAdminRoute = async (req, res) => {
	try {
		let deletedUser = await User.findOneAndDelete({ email: req.body.email });

		res.json({
			message: "deleted user",
			user: deletedUser,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

const updateUserByEmailUsingAdminRoute = async (req, res) => {
	try {
		let updatedUser = await User.findOneAndUpdate(
			{ email: req.body.email },
			req.body,
			{ new: true }
		);

		res.json({
			message: "updated user",
			user: updatedUser,
		});
	} catch (e) {
		res.status(500).json({ message: e.message });
	}
};

module.exports = {
	signUp,
	login,
	updateProfile,
	getAllUsersProfile,
	createUserUsingAdminRoute,
	deleteUserByEmailUsingAdminRoute,
	updateUserByEmailUsingAdminRoute,
};
