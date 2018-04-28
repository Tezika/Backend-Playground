var app = require("express")();

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Start Service:)");
});

app.get("/", function(req, res) {
    res.render("home.ejs");
});

app.get("/fallinlovewith/:thing", function(req, res) {
    var t = req.params.thing;
    res.render("love.ejs", { thing: t });
});

app.get("/posts", function(req, res) {
    var posts = [
        { title: "Hi, there is the first post.", author: "Tezika" },
        { title: "And this is the second post.", author: "Violet" },
        { title: "Em, here is the last post.", author: "Jeff" },
    ];
    res.render("posts.ejs", { postArr: posts });
});