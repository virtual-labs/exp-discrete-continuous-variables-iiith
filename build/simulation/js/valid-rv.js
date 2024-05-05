var currFun1 = 0;
var functions1 = [[1, 0, 0, 0], [0, 2, 2, 2], [1, 3, 2, 4], [3.5, 2, 3, 4]];
var sigmaAlgebra1 = [[0, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [0, 1, 1, 1]];
var sampleSpace = ["W1", "W2", "W3", "W4"];

const fillHeight = 50;
const extraNums = 1;
document.addEventListener("DOMContentLoaded", function () {
    reset1();
});

function reset1() {
    const obs1 = document.getElementById("observations1");
    obs1.innerHTML = ""

    const result1 = document.getElementById("results1");
    result1.innerHTML = "Please select a function to check if it is a Random Variable or not.";

    const canvas1 = document.getElementById("canvas1");
    canvas1.style.border = "";
    const ctx = canvas1.getContext("2d");
    ctx.clearRect(0, 0, canvas1.width, canvas1.height);


    currFun1 = 0;
    document.getElementById("img_f1").classList.remove("selected-img");
    document.getElementById("img_f2").classList.remove("selected-img");
    document.getElementById("img_f3").classList.remove("selected-img");
    document.getElementById("img_f4").classList.remove("selected-img");
}
function chooseFunction1(num) {
    // selects the function and highlights the image of the function
    reset1();
    currFun1 = num;
    const img = document.getElementById("img_f" + num);
    img.classList.add("selected-img");
}
function inverseSet(fun, val) {
    // finds the inverse of the function for the given value
    var res = fun.slice();
    for (let i = 0; i < fun.length; i++) {
        if (fun[i] <= val) {
            res[i] = 1;
        } else {
            res[i] = 0;
        }
    }
    return res;
}
function checkRV(sigmaAlgebra, fun) {
    // checks if the given function is a Random Variable or not
    var sortedFun = [...new Set(fun)].sort(function (a, b) { return a - b });
    for (let i = 0; i <= sortedFun.length; i++) {
        var val;
        if (i == 0) val = sortedFun[i] - 1;
        else if (i == sortedFun.length) val = sortedFun[i - 1] + 1;
        else val = (sortedFun[i] + sortedFun[i - 1]) / 2;
        var inverse = inverseSet(fun, val);
        // check if inverse array is same as any of the sigmaAlgebra array
        var found = false;
        for (let j = 0; j < sigmaAlgebra.length; j++) {
            if (inverse.toString() == sigmaAlgebra[j].toString()) {
                found = true;
                break;
            }
        }
        if (!found) {
            return [false, val];
        }
    }
    return [true, -5000];
}

function check1() {
    if (currFun1 == 0) {
        alert("Please select a function.");
        reset1();
        return;
    }
    var res = checkRV(sigmaAlgebra1, functions1[currFun1 - 1]);
    const result1 = document.getElementById("results1");
    const obs1 = document.getElementById("observations1");
    if (res[0]) {
        result1.innerHTML = "The given function is a Random Variable.";
        obs1.innerHTML = "<b>Correct Answer!!!</b>"
        obs1.style.color = "green";
    } else {
        result1.innerHTML = "The inverse image of the function for <b><span style='color:red'>" + res[1] + "</span></b> is not present in the sigma algebra. Hence, the given function is not a Random Variable.";
        obs1.innerHTML = "<b>Wrong Answer :(</b> ";
        obs1.style.color = "red";
    }
    plotCanvas("canvas1", functions1[currFun1 - 1], res[1]);
}
function plotNumberLine(id, fun) {
    const canvas = document.getElementById(id);
    canvas.style.width = "100%"; // Set the width dynamically based on the container
    canvas.style.height = "100%"; // Set the height dynamically based on the container
    canvas.style.border = "1px solid #ccc";

    // Use 'canvas' for your custom drawings or visualizations
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // draw numberline for the function with integers marked on the line and the function values also marked
    ctx.beginPath();
    ctx.moveTo(10, canvas.height / 2);
    ctx.lineTo(canvas.width - 10, canvas.height / 2);
    ctx.stroke();
    ctx.font = "10px Arial";

    const maxVal = Math.ceil(Math.max(...fun));
    const minVal = Math.floor(Math.min(...fun));
    const range = maxVal - minVal + 2*extraNums;
    const step = (canvas.width - 20) / range;

    for (let i = 0; i <= range; i++) {
        ctx.moveTo(10 + i * step, canvas.height / 2 - 3);
        ctx.lineTo(10 + i * step, canvas.height / 2 + 3);
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(minVal - extraNums + i, 10 + i * step, canvas.height / 2 - 10);
    }
    var valueMap = {};
    for (let i = 0; i < fun.length; i++) {
        ctx.fillStyle = "black";
        ctx.moveTo(10 + (fun[i] - minVal + extraNums) * step, canvas.height / 2 - 3);
        ctx.lineTo(10 + (fun[i] - minVal + extraNums) * step, canvas.height / 2 + 3);
        ctx.stroke();
        ctx.fillText(fun[i], 10 + (fun[i] - minVal + extraNums) * step, canvas.height / 2 - 10);
        if (valueMap[fun[i]] == undefined) {
            valueMap[fun[i]] = 1;
            ctx.fillText("W" + (i + 1), 10 + (fun[i] - minVal + extraNums) * step, 90);
        }
        else {
            valueMap[fun[i]]++;
            ctx.fillText("W" + (i + 1), 10 + (fun[i] - minVal + extraNums) * step, 80 + valueMap[fun[i]] * 10);
        }
    }
    ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
    ctx.fillRect(10, canvas.height / 2 - fillHeight / 2, canvas.width - 20, fillHeight);
    ctx.stroke();
    return ctx;
}
function shadeCanvasToLeft(ctx, fun, val) {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
    // Calculate the coordinates and dimensions based on the canvas size
    const canvasWidth = ctx.canvas.width;
    const canvasHeight = ctx.canvas.height;
    const maxVal = Math.ceil(Math.max(...fun));
    const minVal = Math.floor(Math.min(...fun));
    const range = maxVal - minVal + 2*extraNums;
    const step = (canvasWidth - 20) / range;
    const startX = 10;
    const rectWidth = (val - minVal + extraNums) * step;

    ctx.fillRect(startX, canvasHeight / 2 - fillHeight / 2, rectWidth, fillHeight);
    ctx.moveTo(startX + rectWidth, canvasHeight / 2 - fillHeight/2);
    ctx.lineTo(startX + rectWidth, canvasHeight / 2 + fillHeight/2);
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.fillText(val, startX + rectWidth, canvasHeight / 2 - fillHeight/2);
}
function plotCanvas(id, fun, val) {
    const ctx = plotNumberLine(id, fun);
    if (val != -5000)
        shadeCanvasToLeft(ctx, fun, val);
}


/////////////////////////////////////////////////////////////////////
// function createCanvas(id) {
//     const canvas = document.getElementById(id);
//     canvas.style.width = "100%"; // Set the width dynamically based on the container
//     canvas.style.height = "100%"; // Set the height dynamically based on the container
//     canvas.style.border = "1px solid #ccc";

//     // Use 'canvas' for your custom drawings or visualizations
//     const ctx = canvas.getContext("2d");
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // draw numberline from -10 to 10 and mark these points on the line
//     ctx.beginPath();
//     ctx.moveTo(10, canvas.height / 2);
//     ctx.lineTo(canvas.width - 10, canvas.height / 2);
//     ctx.stroke();
//     ctx.font = "10px Arial";
//     // mark points -10 -5 0 5 10 with a vertical line
//     for (let i = 0; i < 6; i++) {
//         ctx.moveTo(10 + i * (canvas.width - 20) / 5, canvas.height / 2 - 3);
//         ctx.lineTo(10 + i * (canvas.width - 20) / 5, canvas.height / 2 + 3);
//         ctx.stroke();
//         ctx.fillStyle = "black";
//         ctx.fillText(-1 + i, 10 + i * (canvas.width - 20) / 5, canvas.height / 2 - 10);
//     }
//     return ctx;
// }
// function createCanvasInObservation1() {
//     const ctx = createCanvas("canvas1");
//     ctx.fillStyle = "black";
//     ctx.fillText("W1", 10 + 2 * 56, 90);
//     ctx.fillText("W2", 10 + 3 * 56, 90);
//     ctx.fillText("W3", 10 + 4 * 56, 90);
//     return ctx;
// }
// function shadeCanvas(ctx, start, end, region) {
//     ctx.beginPath();
//     if (region == 1) {
//         ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
//     } else if (region == 2) {
//         ctx.fillStyle = "rgba(200, 0, 0, 0.2)";
//     } else if (region == 3) {
//         ctx.fillStyle = "rgba(0, 200, 0, 0.2)";
//     } else {
//         ctx.fillStyle = "rgba(0, 0, 200, 0.2)";
//     }

//     // Calculate the coordinates and dimensions based on the canvas size
//     const canvasWidth = ctx.canvas.width;
//     const canvasHeight = ctx.canvas.height;
//     const startX = 10 + start * (canvasWidth - 20) / 5;
//     const rectWidth = (end - start) * (canvasWidth - 20) / 5;

//     ctx.fillRect(startX, canvasHeight / 2 - 15, rectWidth, 30);
//     ctx.stroke();
// }
// function showResults1() {
//     const ctx = createCanvasInObservation1();
//     shadeCanvas(ctx, 0, 2, 1);
//     shadeCanvas(ctx, 2, 3, 2);
//     shadeCanvas(ctx, 3, 4, 3);
//     shadeCanvas(ctx, 4, 5, 4);
//     const result1 = document.getElementById("results1");
//     result1.innerHTML = "The inverse image of enteries in the 2nd interval , i.e. from 1 to 2 are not present in the sigma algebra. Hence, the given function is not a Random Variable.";
// }
// function changeSelect1(selection) {
//     const obs1 = document.getElementById("observations1");
//     reset1();
//     if (selection == 1) {
//         obs1.innerHTML = "<b>Wrong Answer :(</b> ";
//         obs1.style.color = "red";
//         document.getElementById("yes-btn-1").classList.add("selected-btn");
//     } else {
//         obs1.innerHTML = "<b>Correct Answer!!!</b>"
//         obs1.style.color = "green";
//         document.getElementById("no-btn-1").classList.add("selected-btn");
//     }
//     showResults1();
// }