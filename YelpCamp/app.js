var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine ", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
    res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id, function(error, foundCampground) {
        if (error) {
            console.log(error);
        }
        else {
            res.render("show.ejs", { campground: foundCampground });
        }
    });
    //find the campground with provided ID
    //redner the res with the campground
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
