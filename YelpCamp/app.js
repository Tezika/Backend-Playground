var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.set("view engine ", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

var campgrounds = [
    { name: "Salmon Creek", image: "https://pixabay.com/get/ea36b70928f21c22d2524518b7444795ea76e5d004b0144390f1c07ea2e4bc_340.jpg" },
    { name: "Granite Hill", image: "https://pixabay.com/get/e83db7082af3043ed1584d05fb1d4e97e07ee3d21cac104497f5c078a0e8bcb1_340.jpg" },
    { name: "Mountain Goat's Rest", image: "https://farm9.staticflickr.com/8310/7930464752_585af3c02b.jpg" }
];

app.get("/", function(req, res) {
    res.render("landing.ejs");
});

app.get("/campgrounds", function(req, res) {
    res.render("campgrounds.ejs", { campgrounds: campgrounds })
});

app.post("/campgrounds", function(req, res) {
    var name = req.body.name;
    var img = req.body.img;
    var newCampground = { name: name, image: img };
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Open the YelpCamp server successfully!");
});
