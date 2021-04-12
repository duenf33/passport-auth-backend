const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../../users/model/User");
const keys = process.env.JWT_SECRET_STRING;

const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;

const userJWTLoginStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
	const userEmail = payload.email;
	console.log(payload);
	console.log("===== 13");
	console.log(userEmail);
	try {
		if (userEmail) {
			const user = await (await User.findOne({ email: userEmail })).isSelected(
				"-password"
			);
		}

		const user = await User.findOne({ email: userEmail });
		if (!user) {
			return done(null, false);
		} else {
			return done(null, user);
		}
	} catch (e) {
		return done(e, false);
	}
});
module.exports = userJWTLoginStrategy;
