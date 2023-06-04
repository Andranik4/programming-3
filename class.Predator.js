

class Predator {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]

        ];
    }

    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 5) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var predator = new Predator(newX, newY, 2)
            predatorArr.push(predator)
            this.energy = 5;
        }
    }
    move() {
        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY


        }
    }

    eat() {
        // 1 - 3
        var food = random(this.chooseCell(2))
        // 4
        if (food) {
            // 4.1
            matrix[this.y][this.x] = 0
            // 4.2
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            // 4.3
            this.x = newX
            this.y = newY
            // 4.4
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassArr[i].y == newY)
                    grassEaterArr.splice(i, 1)
            }
            this.energy += 1
        }

    }



    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
        }
    }


}
