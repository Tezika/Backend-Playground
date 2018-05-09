var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    SeedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine ", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

SeedDB();

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