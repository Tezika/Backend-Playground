var express = require("express");

var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res) {
    var t = req.params.thing;
    res.render("love", { thing: t });
});

app.get("/posts", function(req, res) {
    var posts = [
        { title: "Hi, there is the first post.", author: "Tezika" },
        { title: "And this is the second post.", author: "Violet" },
        { title: "Emm..... here is the last post.", author: "Jeff" },
    ];
    res.render("posts", { postArr: posts });
});

app.get("*", function(req, res) {
    res.send("Oops, the page you want to visit doesn't appear anymore!");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Start Service:)");
});