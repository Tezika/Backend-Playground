var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//Add a cat to the database
function add() {
    Cat.create({
        name: "Snow White",
        age: 15,
        temperament: "Bland"
    }, function(err, cat) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(cat);
        }
    });
}

//Retrieve a cat from the database
function retrieve() {
    Cat.find({}, function(err, cats) {
        if (err) {
            console.log("OH NO, ERROR!");
            console.log(err);
        }
        else {
            console.log("All THE CATS...");
            console.log(cats);
        }
    });
}

add();
retrieve();