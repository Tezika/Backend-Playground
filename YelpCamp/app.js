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
});

var Campground = mongoose.model("Campground", campgroundSchema);

var campgrounds = [
    { name: "Salmon Creek", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144390f2c57dafeab6_340.jpg" },
    { name: "Granite Hill", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg" },
    { name: "Salmon Creek", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144390f2c57dafeab6_340.jpg" },
    { name: "Granite Hill", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg" },
    { name: "Salmon Creek", image: "https://pixabay.com/get/ec31b90f2af61c22d2524518b7444795ea76e5d004b0144390f2c57dafeab6_340.jpg" },
    { name: "Granite Hill", image: "https://farm3.staticflickr.com/2259/2182093741_164dc44a24.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg" }
];


app.get("/", function(req, res) {
    res.render("landing.ejs");
});

app.get("/campgrounds", function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Retrieve all campgrounds from the database successfully.");
            res.render("campgrounds.ejs", { campgrounds: campgrounds })
        }
    });

});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var img = req.body.img;
    createNewCampground(name, img,function(){
        res.redirect("/campgrounds");
    });

});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Open the YelpCamp server successfully!");
});

function createNewCampground(name, image, callback) {
    Campground.create({
        name: name,
        image: image
    }, function(err, campground) {
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

function addTemporaryCampgrounds() {
    campgrounds.forEach(function(cg) {
        createNewCampground(cg.name, cg.image);
    });
}
