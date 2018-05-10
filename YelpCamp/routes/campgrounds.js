var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// ==================
// CAMPGROUND ROUTES
// ==================

router.get("/", function(req, res) {
    res.render("landing.ejs");
});

//INDEX -- show all campgrounds
router.get("/campgrounds", function(req, res) {
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
router.post("/campgrounds", function(req, res) {
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

// SHOW -- send a add form
router.get("/campgrounds/new", function(req, res) {
    res.render("campground/new.ejs");
});

router.get("/campgrounds/:id", function(req, res) {
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

module.exports = router;