var matrix = [
    [3, 4, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 2],
    [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 2, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0],
    [5, 3, 1, 3, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 2, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0],
    [1, 1, 2, 1, 0, 0, 0, 1, 0, 4, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 0, 1, 0, 0, 2, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 4, 0, 0, 0, 0, 1, 4, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 0, 1, 1, 2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [4, 1, 2, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 3, 0, 0, 0, 1, 0, 3, 0, 1, 2, 0, 0, 0, 1, 1, 2, 0, 4, 0],
];

var side = 30;
var grassArr = []
var grassEaterArr = []
var predatorArr = []
var peopleArr = []
var immortalArr = [];

function setup() {

    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var grEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grEater);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y, 3)
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var people = new People(x, y, 4)
                peopleArr.push(people);
            }
            else if (matrix[y][x] == 5) {
                var immortal = new Immortal(x, y, 5)
                immortalArr.push(immortal);
            }

        }

    }

}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("Yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("Red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("Orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("Blue");
                rect(x * side, y * side, side, side);
            }

        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }


    for (var i in grassEaterArr) {
        grassEaterArr[i].eat()
        grassEaterArr[i].move()
        grassEaterArr[i].mult()
        grassEaterArr[i].die()


    }
    for (var i in predatorArr) {
        predatorArr[i].eat()
        predatorArr[i].move()
        predatorArr[i].mult()
        predatorArr[i].die()
    }

    for (var i in peopleArr) {
        peopleArr[i].eat()
        peopleArr[i].move()
        peopleArr[i].mult()
        peopleArr[i].die()
    }
    for (var i in immortalArr) {
        immortalArr[i].eat()
        immortalArr[i].move()
    }

    if (grassEaterArr.length == 0) {
        for (var i = 0; i < 50; i++) {
            var x = floor(random(matrix[0].leght - 1))
            var y = floor(random(matrix.length - 1))
            if (y != 10) {
                matrix[y][x] = 2
                var grassEater = new GrassEater(x, y, 2)
                grassEaterArr.push(grassEater)
            }
        }
    }
}
