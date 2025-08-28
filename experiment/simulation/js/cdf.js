var minNum = -1;
var maxNum = 3;

var generatedNum1;
var userInvImg1;
var prob1 = { "1": 0.2, "2": 0.8 }; // Probabilities of outcomes
var rv1 = [1, 2, 2, 2]; // X(w_i) for i=1,2,3,4
var cdfValues = { "1": 0.2, "2": 1.0 }; // F_X(x) values at points of change

document.addEventListener("DOMContentLoaded", function () {
    reset1();
});

function generateRandom1() {
    document.getElementById("generateNumberButton1").style.display = "none";
    generatedNum1 = (Math.random() * (maxNum - minNum) + minNum).toFixed(2);
    document.getElementById("generatedNumber1").innerHTML = "The number generated is c = <b>" + generatedNum1 + "</b>";
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById("generatedNumber1")]);
    }
    document.getElementById("selectInverseImage1").style.display = "block";
}

function setInvImg1(a, b, c, d) {
    document.getElementById("selectInverseImage1").style.display = "none";
    userInvImg1 = [a, b, c, d];
    // display the selected inverse image
    let invImgStr = "";
    let elements = [];
    if (a) elements.push("\\omega_1");
    if (b) elements.push("\\omega_2");
    if (c) elements.push("\\omega_3");
    if (d) elements.push("\\omega_4");
    
    if (elements.length === 0) {
        invImgStr = "\\( \\phi \\)";
    } else {
        invImgStr = "\\(\\{" + elements.join(', ') + "\\}\\)";
    }
    
    document.getElementById("selectedInverseImage1").innerHTML = "<p>You selected the inverse image: <b>" + invImgStr + "</b></p>";
    // Trigger MathJax rendering if available
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById("selectedInverseImage1")]);
    }
    document.getElementById("enterCDF1").style.display = "block";
}

function checkCDF1() {
    var userCDF = parseFloat(document.getElementById("enteredCDF1").value);
    var calculatedInverseImage = calculateInverseImage1();
    var calculatedCDF = calculateCDF1();
    let obs = [];

    // Check inverse image first
    var isInverseImageCorrect = JSON.stringify(calculatedInverseImage) === JSON.stringify(userInvImg1);

    if (!isInverseImageCorrect) {
        let correctElements = [];
        if (calculatedInverseImage[0]) correctElements.push("\\omega_1");
        if (calculatedInverseImage[1]) correctElements.push("\\omega_2, \\omega_3, \\omega_4");
        let correctSetStr = correctElements.length > 0 ? "\\(\\{" + correctElements.join(', ') + "\\}\\)" : "\\( \\phi \\)";
        showObservation1(["Incorrect!", `The inverse image for c=${generatedNum1} is incorrect. The correct set is ${correctSetStr} because it includes all outcomes ω where X(ω) ≤ ${generatedNum1}.`] );
        if (window.MathJax) {
            MathJax.typesetPromise([document.getElementById("results1")]);
        }
        return;
    }

    // If inverse image is correct, check CDF value
    if (Math.abs(calculatedCDF - userCDF) < 0.01) {
        showObservation1(["Correct!", `The inverse image and CDF value are correct! F_X(${generatedNum1}) = P(${getInverseImageString(calculatedInverseImage)}) = ${calculatedCDF}.`] );
    } else {
        showObservation1(["Incorrect!", `Your inverse image was correct, but the CDF value is not. The correct CDF is <b>${calculatedCDF}</b>, which is the total probability of the elements in the inverse image.`]);
    }
    // Always trigger MathJax for results1 after showObservation1
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById("results1")]);
    }
}

function getInverseImageString(imageArray) {
    let elements = [];
    if (imageArray[0]) elements.push("\\omega_1");
    if (imageArray[1]) elements.push("\\omega_2, \\omega_3, \\omega_4");
    return elements.length > 0 ? "\\(\\{" + elements.join(', ') + "\\}\\)" : "\\( \\phi \\)";
}

// returns the inverse image of the generated number
function calculateInverseImage1() {
    var invImg = [0, 0, 0, 0];
    if (generatedNum1 >= 1) invImg[0] = 1;
    if (generatedNum1 >= 2) {
        invImg[1] = 1;
        invImg[2] = 1;
        invImg[3] = 1;
    }
    return invImg;
}

function calculateCDF1() {
    if (generatedNum1 < 1) return 0;
    if (generatedNum1 >= 1 && generatedNum1 < 2) return prob1["1"];
    if (generatedNum1 >= 2) return prob1["1"] + prob1["2"];
    return 0; // Default case
}

function showObservation1(obs) {
    if (obs[0] === "Incorrect!") {
        document.getElementById("observations1").style.color = "red";
    } else {
        document.getElementById("observations1").style.color = "green";
    }
    document.getElementById("observations1").innerHTML = "<b>" + obs[0] + "</b>";
    document.getElementById("results1").innerHTML = obs.length > 1 ? obs[1] : "";
    // Trigger MathJax rendering for both observations1 and results1
    if (window.MathJax) {
        MathJax.typesetPromise([
            document.getElementById("observations1"),
            document.getElementById("results1")
        ]);
    }
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