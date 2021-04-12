const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
	adminName: {
		type: String,
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		require: true,
	},
	password: {
		type: String,
		required: true,
	},
	userCreated: {
		type: Date,
		default: new Date(),
	},
});

module.exports = mongoose.model("admin", AdminSchema);
