var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});



function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, waterCount, fireCount) {
    let matrix = []
    //    matrixSize
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0)
        }
    }


    //   grassCount
    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
        }
    }
    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
        }
    }
    for (let i = 0; i < waterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
        }

    }

    for (let i = 0; i < fireCount; i++) {
        let x = Math.floor(Math.random() * matrixSize)
        let y = Math.floor(Math.random() * matrixSize)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
        }

    }
    return matrix
}


matrix = matrixGenerator(30, 35, 20, 15, 30, 35)


io.sockets.emit("send matrix", matrix)

// char Arrays

grassArr = []
grassEaterArr = []
predatorArr = []
waterArr = []
fireArr = []



/////////modules

let Grass = require("./grass")
let GrassEater = require("./grassEater")
let Predator = require("./predator")
let Fire = require("./fire")
let Water = require("./water")

function createObject(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y)
                grassArr.push(grass)
            } else if (matrix[y][x] == 2) {
                let great = new GrassEater(x, y)
                grassEaterArr.push(great)
            } else if (matrix[y][x] == 3) {
                let pred = new Predator(x, y)
                predatorArr.push(pred)
            } else if (matrix[y][x] == 4) {
                let water = new Water(x, y)
                waterArr.push(water)
            } else if (matrix[y][x] == 5) {
                let fire = new Fire(x, y)
                fireArr.push(fire)
            }
        }
    }
    io.sockets.emit("send matrix", matrix)
}

function game() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }
    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in waterArr) {
        waterArr[i].eat()
    }
    for (let i in fireArr) [
        fireArr[i].eat()
    ]

    io.sockets.emit("send matrix", matrix)
}
setInterval(game, 300)

var weather;

function Winter() {
    weather = "winter";
    io.sockets.emit("Winter", weather);
}

function Summer() {
    weather = "summer";
    io.sockets.emit("Summer", weather);
}

function Spring() {
    weather = "spring";
    io.sockets.emit("Spring", weather);
}
function Autumn() {
    weather = "autumn";
    io.sockets.emit("Autumn", weather);
}

function kill() {
    grassArr = [];
    grassEaterArr = [];
    grassEaterArr = [];
    grassEaterEaterArr = [];
    fireArr = [];
    waterArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

//Add buttons
function AddGrass() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 1

            let grass = new Grass(x, y)
            grassArr.push(grass)
        }

    }

    io.sockets.emit("send matrix", matrix)


}

function AddGrassEater() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 2

            let grassEater = new GrassEater(x, y)
            grassEaterArr.push(grassEater)
        }

    }
    io.sockets.emit("send matrix", matrix)


}
function AddPredator() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 3

            let predator = new Predator(x, y)
            predatorArr.push(predator)
        }

    }
    io.sockets.emit("send matrix", matrix)


}
function AddFire() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 5

            let fire = new Fire(x, y)
            fireArr.push(fire)
        }

    }
    io.sockets.emit("send matrix", matrix)


}
function AddWater() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length)
        let y = Math.floor(Math.random() * matrix.length)

        if (matrix[y][x] == 0) {
            matrix[y][x] = 4

            let water = new Water(x, y)
            waterArr.push(water)
        }

    }
    io.sockets.emit("send matrix", matrix)


}

// ////statistics
var statistics = {

}
setInterval(function () {

    statistics.grass = grassArr.length
    statistics.grassEater = grassEaterArr.length
    statistics.predator = predatorArr.length
    statistics.water = waterArr.length
    statistics.fire = fireArr.length
    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
         console.log("game of life statistics");
    })
}, 1000)




io.on("connection", function (socket) {
    createObject(matrix)
    socket.on("spring", Spring);
    socket.on("summer", Summer);
    socket.on("autumn", Autumn);
    socket.on("winter", Winter);
    socket.on("addGrass", AddGrass)
    socket.on("addGrassEater", AddGrassEater)
    socket.on("KillAll", kill);
    socket.on("addPredator", AddPredator)
    socket.on("addFire", AddFire)
    socket.on("addWater", AddWater)
})







