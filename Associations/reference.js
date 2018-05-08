var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");

//POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

//USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    //Assoicate the post by referencing.
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});

var User = mongoose.model("User", userSchema);

// User.create({
//     email: "bob.blie@gmail.com",
//     name: "Bob Blie"
// }, function(err, usr) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log(usr);
//     }
// });

// Post.create({
//     title: "How to cook the best burger pt.3",
//     content: "blah blah blah blah"
// }, function(err, post) {
//     if (err) {
//         console.log(post);
//     }
//     else {
//         User.findOne({ name: "Bob Blie" }, function(err, foundUsr) {
//             if (err) {
//                 console.log(err);
//             }
//             else {
//                 foundUsr.posts.push(post);
//                 foundUsr.save(function(err, usr) {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         console.log(usr);
//                     }
//                 });
//             }
//         });
//     }
// });

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