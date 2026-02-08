var minNum = -1;
var maxNum = 3;

var generatedNum1;
var userInvImg1;
var prob1 = { "1": 0.2, "2": 0.8 }; // Probabilities for outcomes where X=1 and X=2
var rv1 = [1, 2, 2, 2]; // X(w_i) for i=1,2,3,4

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
    // Clear previous results before showing new options
    document.getElementById("observations1").innerHTML = "";
    document.getElementById("results1").innerHTML = "";
    document.getElementById("selectInverseImage1").style.display = "block";
}

function checkInverseImage1(a, b, c, d) {
    document.getElementById("selectInverseImage1").style.display = "none";
    userInvImg1 = [a, b, c, d];

    // Display the user's selected inverse image
    document.getElementById("selectedInverseImage1").innerHTML = "<p>You selected the inverse image: <b>" + getInverseImageString(userInvImg1) + "</b></p>";
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById("selectedInverseImage1")]);
    }

    // Perform the check
    var calculatedInverseImage = calculateInverseImage1();
    var isInverseImageCorrect = JSON.stringify(calculatedInverseImage) === JSON.stringify(userInvImg1);

    if (isInverseImageCorrect) {
        showObservation1(["Correct!", `The inverse image is correct. It includes all outcomes ω where X(ω) ≤ ${generatedNum1}. Now, calculate the total probability.`]);
        document.getElementById("enterCDF1").style.display = "block"; // Show the next step
    } else {
        let correctSetStr = getInverseImageString(calculateInverseImage1());
        showObservation1(["Incorrect!", `The inverse image for c=${generatedNum1} is incorrect. The correct set is ${correctSetStr}. Please press Reset to try again.`]);
        document.getElementById("enterCDF1").style.display = "none"; // Hide the next step
    }
}

function checkCDF1() {
    var userCDF = parseFloat(document.getElementById("enteredCDF1").value);
    var calculatedCDF = calculateCDF1();

    // Check the CDF value, allowing for a 1% (0.01) leeway
    if (Math.abs(calculatedCDF - userCDF) < 0.01) {
        let finalCorrectStr = getInverseImageString(calculateInverseImage1());
        showObservation1(["Correct!", `The CDF value is correct! <br> F_X(${generatedNum1}) = P(${finalCorrectStr}) = <b>${calculatedCDF}</b>.`]);
    } else {
        showObservation1(["Incorrect!", `The inverse image was correct, but the CDF value is not. The correct CDF is <b>${calculatedCDF}</b>, which is the total probability of the elements in the inverse image.`]);
    }

    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById("results1")]);
    }
}

// Helper function to format the inverse image array into a string
function getInverseImageString(imageArray) {
    let elements = [];
    if (imageArray[0]) elements.push("\\omega_1");
    
    // Check for the group of w2, w3, w4
    if (imageArray[1] && imageArray[2] && imageArray[3]) {
        elements.push("\\omega_2, \\omega_3, \\omega_4");
    } else { // Handle cases where they might be selected individually (though not an option here)
        if (imageArray[1]) elements.push("\\omega_2");
        if (imageArray[2]) elements.push("\\omega_3");
        if (imageArray[3]) elements.push("\\omega_4");
    }

    if (elements.length === 0) return "\\( \\phi \\)";

    // Join elements for final display string
    return "\\(\\{" + elements.join(', ') + "\\}\\)";
}

// Calculates the correct inverse image array [w1, w2, w3, w4] based on 'c'
function calculateInverseImage1() {
    var invImg = [0, 0, 0, 0];
    // X(w1)=1, X(w2)=2, X(w3)=2, X(w4)=2
    // We need the set of all w such that X(w) <= c
    if (generatedNum1 >= 1) invImg[0] = 1; // if c>=1, w1 is in the set
    if (generatedNum1 >= 2) {             // if c>=2, w2, w3, and w4 are also in the set
        invImg[1] = 1;
        invImg[2] = 1;
        invImg[3] = 1;
    }
    return invImg;
}

// Calculates the correct CDF value based on 'c'
function calculateCDF1() {
    // P(X=1) = P({w1}) = 0.2
    // P(X=2) = P({w2,w3,w4}) = 0.8
    if (generatedNum1 < 1) return 0;
    if (generatedNum1 >= 1 && generatedNum1 < 2) return prob1["1"];
    if (generatedNum1 >= 2) return prob1["1"] + prob1["2"];
    return 0; // Default case
}

function showObservation1(obs) {
    document.getElementById("observations1").style.color = (obs[0] === "Incorrect!") ? "red" : "green";
    document.getElementById("observations1").innerHTML = "<b>" + obs[0] + "</b>";
    document.getElementById("results1").innerHTML = obs.length > 1 ? obs[1] : "";
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
    document.getElementById("enteredCDF1").value = "";
    document.getElementById("observations1").innerHTML = "";
    document.getElementById("results1").innerHTML = "";
}