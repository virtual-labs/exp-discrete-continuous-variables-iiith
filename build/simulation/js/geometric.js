var p;
var result;
var counter = 0;

// on dom load
document.addEventListener("DOMContentLoaded", function () {
    reset();
});

function setPbernoulli() {
    p = document.getElementById("input-p-bernoulli").value;
    p = parseFloat(p);
    if (p < 0 || p > 1) {
        alert("Invalid P(H) value");
        return;
    }
    document.getElementById("input-p-bernoulli-div").style.display = "none";
    document.getElementById("bernoulli-instance").style.display = "block";
    document.getElementById("geometric-counter-div").style.display = "block";
    document.getElementById("p-bernoulli-value").innerHTML = p;
}
function bernoulli() {
    var random = Math.random();
    result = (random < p) ? 1 : 0;
    document.getElementById("bernoulli-result").innerHTML = "<b>" + (result == 0 ? "Tail" : "Head") + "</b>";

    updateCounter();
}

function updateCounter() {
    counter++;
    document.getElementById("geometric-counter").innerHTML = counter;
    if (result == 1) {
        document.getElementById("bernoulli-instance-btn").disabled = true;
        showObservations();
    }
}


function showObservations() {
    var observation = "We got Head in the <b>" + counter + (counter == 1 ? "st" : counter == 2 ? "nd" : counter == 3 ? "rd" : "th") + "</b> trial in this experiment. Thus, the value of the Geometric random variable is <b>X = " + counter + "</b>.<br>";
    document.getElementById("observations").innerHTML = observation;
}

function reset() {
    counter = 0;
    document.getElementById("geometric-counter").innerHTML = counter;
    document.getElementById("input-p-bernoulli").value = 0.5;
    document.getElementById("input-p-bernoulli-div").style.display = "block";
    document.getElementById("bernoulli-instance").style.display = "none";
    document.getElementById("bernoulli-instance-btn").disabled = false;
    document.getElementById("observations").innerHTML = "";
    document.getElementById("bernoulli-result").innerHTML = "";
    document.getElementById("geometric-counter-div").style.display = "none";
}
