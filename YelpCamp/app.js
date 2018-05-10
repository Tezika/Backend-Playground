var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    SeedDB = require("./seeds");

var campgroundRouter = require("./routes/campgrounds"),
    commentsRouter = require("./routes/comments"),
    authRouter = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
SeedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Tezika win the cleverest pebple",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// transfer the user to every individual route.
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use(campgroundRouter);
app.use(commentsRouter);
app.use(authRouter);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Open the YelpCamp server successfully!");
});