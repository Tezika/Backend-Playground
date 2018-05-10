var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//===============
//COMMENTS ROUTE
//===============

//NEW ROUTE
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("comments/new.ejs", { campground: foundCampground });
        }
    });
});

//POST THE NEW COMMENT
router.post("/", isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        }
        else {
            //create a new comment.
            Comment.create(req.body.comment, function(err, newComment) {
                if (err) {
                    console.log(err);
                    res.redirect("/campgrounds");
                }
                else {
                    //connect new comment to campground.
                    foundCampground.comments.push(newComment);
                    foundCampground.save(function(err, savedCampground) {
                        if (err) {
                            console.log(err);
                            res.redirect("/campgrounds");
                        }
                        else {
                            console.log("Associated a new comment with a campground successfully");
                            //redirect camoground show page.
                            res.redirect("/campgrounds/" + foundCampground._id);
                        }
                    });
                }
            });
        }
    });
});

// middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
