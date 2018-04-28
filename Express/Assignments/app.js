var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
    var animal = req.params.animal;
    var sounds = {
        dog: "Wof Wof",
        cow: "Moo",
        pig: "Oink"
    }
    res.send("The " + animal.toLowerCase() + " says " + "'" + sounds[animal] + "'" + ".");
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