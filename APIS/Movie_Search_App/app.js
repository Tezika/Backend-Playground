var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});

app.get("/results", function(req, res) {
    var search = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + search + "&apikey=thewdb";
    request(url, function(error, response, body) {
        var data = JSON.parse(body);
        if (data.Response === "False") {
            res.send("Cannot find any movie:(");
        }
        else if (!error && response.statusCode === 200) {
            res.render("results", { data: data });
        }
    });
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The movie app started successfully!");
});