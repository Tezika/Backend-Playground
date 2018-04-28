var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var howl = "";
    switch(req.params.animal){
        case "dog":
            howl = "Wof Wof";
            break;
        case "cow":
            howl = "Moo";
            break;
        case "pig":
            howl = "Oink"
            break;
        default:
            break;
    }
    res.send("The " + req.params.animal + " says "+ "'"+ howl + "'" + ".");
});

app.get("/repeat/:pattern/:count", function(req, res) {
    var count = Number(req.params.count);
    if (Number.isNaN(count)) {
        res.send("Oops, the parameter of count is invalid.");
        return;
    }
    else {
        var saying = "";
        for (var i = 0; i < count; i++) {
            saying += req.params.pattern;
            saying += " ";
        }
        res.send(saying);
    }
});

app.get("*", function(req, res) {
    res.send("Oops, the page you want to visit doesn't exist, please check that :(.");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Start the server successfully.....");
});