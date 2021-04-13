// const { Strategy, ExtractJwt } = require("passport-jwt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../../users/model/User");
const keys = process.env.JWT_SECRET_STRING;
const jwtOpts = {};
jwtOpts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOpts.secretOrKey = keys;
const userJWTLoginStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
	const userEmail = payload.email;
	try {
		if (userEmail) {
			const user = await User.findOne({ email: userEmail }).select("-password");
			if (!user) {
				return done(null, false);
			} else {
				return done(null, user);
			}
		} else {
			return done(null, false);
		}
	} catch (e) {
		return done(e, false);
	}
});
module.exports = userJWTLoginStrategy;
