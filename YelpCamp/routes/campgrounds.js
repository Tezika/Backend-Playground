var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// ==================
// CAMPGROUND ROUTES
// ==================

//INDEX -- show all campgrounds
router.get("/", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Retrieve all campgrounds from the database successfully.");
            res.render("index.ejs", { campgrounds: campgrounds });
        }
    });
});

// CREATE -- add a new campground to db
router.post("/", isLoggedIn, function(req, res) {
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    console.log(req.user);
    createNewCampground({
            name: name,
            image: img,
            description: desc,
            author: {
                id: req.user._id,
                username: req.user.username
            }
        },
        function() {
            res.redirect("/campgrounds");
        });
});

// SHOW -- send an addition form
router.get("/new", isLoggedIn, function(req, res) {
    res.render("campground/new.ejs");
});

router.get("/:id", function(req, res) {
    // find the campground with provided ID.
    Campground.findById(req.params.id).populate("comments").exec(function(error, foundCampground) {
        if (error) {
            console.log(error);
        }
        else {
            // redner the res with the campground.
            res.render("campground/show.ejs", { campground: foundCampground });
        }
    });
});

// EDIT 
router.get("/:id/edit", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campground/" + foundCampground._id);
        }
        else {
            res.render("campground/edit", { campground: foundCampground });
        }
    });
});

// UPDATE
router.put("/:id", isLoggedIn, function(req, res) {
    // find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if (err) {
            console.log(err);
        }
        else {
            // redirect the show page
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    });
});

// a function serves to create a new campground
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

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;