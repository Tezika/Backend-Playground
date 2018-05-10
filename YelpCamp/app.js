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

app.get("/", function(req, res) {
    res.render("landing.ejs");
});

//INDEX -- show all campgrounds
app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Retrieve all campgrounds from the database successfully.");
            res.render("index.ejs", { campgrounds: campgrounds })
        }
    });
});

//CREATE -- add a new campground to db
app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    createNewCampground({
            name: name,
            image: img,
            description: desc
        },
        function() {
            res.redirect("/campgrounds");
        });
});

//SHOW -- send a add form
app.get("/campgrounds/new", function(req, res) {
    res.render("campground/new.ejs");
});

app.get("/campgrounds/:id", function(req, res) {
    //find the campground with provided ID.
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if (error) {
            console.log(error);
        }
        else {
            //redner the res with the campground.
            res.render("campground/show.ejs", { campground: foundCampground });
        }
    });
});

//===============
//COMMENTS ROUTE
//===============

//NEW ROUTE
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new.ejs", { campground: foundCampground });
        }
    });
});

//POST THE NEW COMMENT
app.post("/campgrounds/:id/comments", function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            //create a new comment.
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                }
                else {
                    //connect new comment to campground.
                    foundCampground.comments.push(newComment);
                    foundCampground.save(function(err, savedCampground) {
                        if (err) {
                            console.log(err);
                            res.redirect("/campgrounds");
                        }
                        else {
                            console.log("Associated a new comment with a campground successfully");
                            //redirect camoground show page.
                            res.redirect("/campgrounds/" + foundCampground._id);
                        }
                    });
                }
            });
        }
    });
});

// ==========
// AUTH ROUTES
// ==========

//show register form
app.get("/register", function(req, res) {
    res.render("register");
});

// handle sign up logic
app.post("/register", function(req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function(err, newUsr) {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Open the YelpCamp server successfully!");
});

function createNewCampground(campground, callback) {
    Campground.create(campground, function(err, campground) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Create new campground in the database successfully");
            console.log(campground);
        }
        if (callback != null) {
            callback();
        }
    });
}