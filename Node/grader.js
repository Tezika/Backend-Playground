function average(scores){
    if(scores.length == 0){
        return 0;
    }
    var sum = 0;
    scores.forEach(function(score){
        sum += score;
    })
    return Math.round(sum/scores.length);
}

console.log("Average score for environment science");
var scores = [90, 98, 89, 100, 100, 86, 94];
console.log(average(scores)); //should return 94

console.log("Average score for organic chemistry");
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log(average(scores2)); //should return 68
