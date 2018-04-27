console.log("======================");
console.log("Welcome to my shop :)");
console.log("======================");

var numOfProducts = 10;

var faker = require("faker");
for (var i = 0; i < numOfProducts; i++) {
    console.log(faker.commerce.productName() +
    " - " + "$" + faker.commerce.price());
}



