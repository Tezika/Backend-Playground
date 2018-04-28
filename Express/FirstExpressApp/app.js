console.log("OUR EXPRESS APP WILL GO HERE.");

var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi, there");
});

app.get("/bye", function(req, res) {
    res.send("Hi, Bye");
});

app.get("/cat", function(req, res) {
    res.send("MEOW!!");
});

app.get("/r/:subreddit", function(req, res){
    res.send("Welcome to the subreddit, " + req.params.subreddit + ":)"); 
});

app.get("/r/:subreddit/comments/:id/:title", function(req, res){
    res.send("Welcome to the comment page."); 
});

app.get("*", function(req, res){
    res.send("Wow, you're a star.");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The server has started......");
});
