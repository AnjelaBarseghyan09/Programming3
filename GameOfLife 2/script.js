var socket = io()

let side = 25


function setup() {
    createCanvas(30 * side, 30 * side)

}
socket.on("Spring", function (data) {
    weather = data;
})
socket.on("Summer", function (data) {
    weather = data;
})
socket.on("Autumn", function (data) {
    weather = data;
})
socket.on("Winter", function (data) {
    weather = data;
})
 var weather = "spring";

socket.on('send matrix', nkarel);


function nkarel(matrix) {

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                   if (weather == "spring") {
                       fill ("#B209B2")
                   }else if (weather == "summer") {
                       fill ("#0EF0CA")
                   }else if (weather == "autumn") {
                    fill ("#87FE00")
                }else if (weather == "winter") {
                    fill ("white")
                }

            } else if (matrix[y][x] == 2) {

                fill("yellow")

            } else if (matrix[y][x] == 3) {
                fill("red")

            } else if (matrix[y][x] == 4) {
                fill("blue")
            } else if (matrix[y][x] == 5) {
                fill("orange")
            }

            else {
                fill("gray")
            }
            rect(x * side, y * side, side, side)
        }
    }

}



socket.on("send matrix", nkarel)


function Winter() {
    socket.emit("winter");
   
}
function Summer() {
    socket.emit("summer");
}
function Spring() {
    socket.emit("spring");
}
function Autumn() {
    socket.emit("autumn");
}
function AddGrass() {
    socket.emit("addGrass")
}

function AddGrassEater() {
    socket.emit("addGrassEater")
}

function AddPredator() {
    socket.emit("addPredator")
}

function AddFire() {
    socket.emit("addFire")
}

function AddWater() {
    socket.emit("addWater")
}

function KillAll() {
    socket.emit("KillAll")
}
