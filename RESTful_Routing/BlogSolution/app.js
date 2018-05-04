var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});
var Blog = mongoose.model("Blog", blogSchema);

//ADD A DEFAULT BLOG TO THE DB
// Blog.create({
//     title: "Test Blog",
//     image: "https://pixabay.com/get/ea36b70c2ffc1c22d2524518b7444795ea76e5d004b0144390f4c070a6edb1_340.jpg",
//     body: "Hello, I'm a test blog.Please ignore me :)"
// }, function(err, blog) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Add a test blog to db successfully!");
//         console.log(blog);
//     }
// });

//RESTFUL ROUTES
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index", { blogs: blogs });
        }
    });
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
});

app.post("/blogs", function(req, res) {
    //create blog;
    Blog.create(req.body.blog, function(err, blog) {
        if (err) {
            res.render("new");
        }
        else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server for blog start successfully!");
});
