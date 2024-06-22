var minNum = -1;
var maxNum = 3;

var generatedNum1;
var invImg1;
var eventSpace1 = [[0, 0, 0, 0], [1, 1, 1, 1], [1, 0, 0, 0], [0, 1, 1, 1]];
var prob1 = [0, 1, 0.2, 0.8];
var rv1 = [1, 2, 2, 2];
var cdf1 = [0.2, 1, 1, 1]

document.addEventListener("DOMContentLoaded", function () {
    reset1();
});

function generateRandom1() {
    document.getElementById("generateNumberButton1").style.display = "none";
    generatedNum1 = Math.random() * (maxNum - minNum + 1) + minNum;
    // bound the number till 2 decimal places
    generatedNum1 = generatedNum1.toFixed(2);
    document.getElementById("generatedNumber1").innerHTML = "The number generated is c = <b>" + generatedNum1 + "</b>";
    document.getElementById("selectInverseImage1").style.display = "block";
    return generatedNum1;
}

function setInvImg1(a, b, c, d) {
    document.getElementById("selectInverseImage1").style.display = "none";
    invImg1 = [a, b, c, d];
    // display the selected inverse image
    var invImg = "\(\{";
    for (var i = 0; i < 4; i++) {
        if (invImg1[i] == 1) {
            invImg += "\omega_" + (i + 1) + ",";
        }
    }
    invImg += "\}\)";
    if (a == 0 && b == 0 && c == 0 && d == 0) {
        invImg = "\(\phi\)";
    }
    document.getElementById("selectedInverseImage1").innerHTML = "<p>The selected inverse image is <b>" + invImg + "</b></p>";
    document.getElementById("enterCDF1").style.display = "block";
}

function checkCDF1() {
    var cdf = document.getElementById("enteredCDF1").value;

    var calculatedInverseImage = calculateInverseImage1();
    const obs = [];
    for (var i = 0; i < 4; i++) {
        if (calculatedInverseImage[i] !== invImg1[i]) {
            obs.push("Incorrect!");
            var res = "The inverse image is not correct. <b>\omega_" + (i + 1) + "</b> Should";
            if (invImg1[i] == 0) {
                res += " be included.";
            } else {
                res += " not be included.";
            }
            obs.push(res);
            showObservation1(obs);
            return;
        }
    }
    var calculatedCDF = calculateCDF1();
    if (calculatedCDF == cdf) {
        obs.push("Correct!");
    } else {
        obs.push("Incorrect!");
        var res = "The correct CDF is <b>" + calculatedCDF + "</b>.";
        obs.push(res);
    }

    showObservation1(obs);
    return;
}

// returns the inverse image of the generated number
function calculateInverseImage1() {
    var invImg = [];
    for (var i = 0; i < 4; i++) {
        if (generatedNum1 >= rv1[i]) {
            invImg.push(1);
        } else {
            invImg.push(0);
        }
    }
    return invImg;
}
function calculateCDF1() {
    // find the largest value in rv1 which is less than or equal to generatedNum1
    var maxIndex = -1;
    var maxVal = minNum;
    for (var i = 0; i < 4; i++) {
        if (rv1[i] <= generatedNum1 && rv1[i] > maxVal) {
            maxVal = rv1[i];
            maxIndex = i;
        }
    }
    if (maxIndex == -1) {
        return 0;
    }
    var cdf = cdf1[maxIndex];
    return cdf;
}

function showObservation1(obs) {
    if (obs[0] == "Incorrect!") {
        document.getElementById("observations1").style.color = "red";
    } else {
        document.getElementById("observations1").style.color = "green";
    }
    document.getElementById("observations1").innerHTML = "<b>" + obs[0] + "</b>";
    if (obs.length == 2)
        document.getElementById("results1").innerHTML = obs[1];
}

function reset1() {
    document.getElementById("generateNumberButton1").style.display = "block";
    document.getElementById("generatedNumber1").innerHTML = "";
    document.getElementById("selectInverseImage1").style.display = "none";
    document.getElementById("selectedInverseImage1").innerHTML = "";
    document.getElementById("enterCDF1").style.display = "none";
    document.getElementById("enteredCDF1").value = "0";
    document.getElementById("observations1").innerHTML = "";
    document.getElementById("results1").innerHTML = "";
}