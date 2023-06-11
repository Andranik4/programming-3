class Immortal {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
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

    chooseCell(char1, char2, char3, char4) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1 || matrix[y][x] == char2 || matrix[y][x] == char3 || matrix[y][x] == char4) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    
    move() {
        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 5
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY


        }
    }

    eat() {
        // 1 - 3
        var food = random(this.chooseCell(1, 2, 3, 4))
        // 4
        if (food) {
            // 4.1
            matrix[this.y][this.x] = 0
            // 4.2
            var newX = food[0]
            var newY = food[1]

            if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (grassArr[i].x == newX && grassArr[i].y == newY)
                        grassArr.splice(i, 1)
                }
            } else if (matrix[newY][newX] == 2) {
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY)
                        grassEaterArr.splice(i, 1)
                }
            }else if (matrix[newY][newX] == 3) {
                for (var i in predatorArr) {
                    if (predatorArr[i].x == newX && predatorArr[i].y == newY)
                         (predatorArr.splice(i, 1))
                }
            }

            matrix[newY][newX] = 5
            // 4.3
            this.x = newX
            this.y = newY
            // 4.4
            this.energy++
        }

    }
}

