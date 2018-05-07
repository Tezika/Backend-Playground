var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer");

//APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

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

//
app.post("/blogs", function(req, res) {
    //santilize the blog's body
    req.body.blog.body = req.sanitize(req.body.blog.body);
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

//SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.render("show", { blog: foundBlog });
        }
    });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.render("edit", { blog: foundBlog });
        }
    });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
    //santilize the blog's body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if (err) {
            res.redirect("/blogs");
        }
        else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(error, removedBlog) {
        if (error) {
            res.redirect("/blogs/" + req.params.id);
        }
        else {
            res.redirect("/blogs");
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server for blog start successfully!");
});
