var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");

require("dotenv").config();

var passport = require("passport");
const userJWTLoginStrategy = require("./routes/lib/passport/user-passport-auth");

const adminJWTLoginStrategy = require("./routes/lib/passport/admin-passport-auth");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users/users");
var adminRouter = require("./routes/admin/admin");

mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("MONGO DB CONNECTED");
	})
	.catch((e) => {
		console.log(e);
	});

var app = express();

app.use(passport.initialize());

passport.use("jwt-user", userJWTLoginStrategy);
passport.use("admin-auth", adminJWTLoginStrategy);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors({ origin: ["http://localhost:3000"] }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
