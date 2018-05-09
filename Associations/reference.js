var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

var Post = require("./models/post");
var User = require("./models/user");

Post.create({
    title: "How to cook the best burger pt.4",
    content: "blah blah blah blah"
}, function(err, post) {
    if (err) {
        console.log(post);
    }
    else {
        User.findOne({ name: "Bob Blie" }, function(err, foundUsr) {
            if (err) {
                console.log(err);
            }
            else {
                foundUsr.posts.push(post);
                foundUsr.save(function(err, usr) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(usr);
                    }
                });
            }
        });
    }
});

// Find user && Find all posts for that user had
User.findOne({ name: "Bob Blie" }).populate("posts").exec(function(err, user) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(user);
        user.posts.forEach(function(p) {
            console.log(p.title);
            console.log(p.content);
        });
    }
});