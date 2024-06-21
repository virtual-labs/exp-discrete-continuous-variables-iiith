var p;
var result;

// on dom load
document.addEventListener("DOMContentLoaded", function() {
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
    document.getElementById("p-bernoulli-value").innerHTML = p;
}
function bernoulli() {
    document.getElementById("bernoulli-instance-btn").disabled = true;
    var random = Math.random();
    result = (random < p) ? 1 : 0;
    document.getElementById("bernoulli-result").innerHTML = "<b>"+(result==0?"Tail":"Head")+"</b>";

    showObservations();
}

function showObservations() {
    var observation = "We got <b>" + (result==0?"Tail":"Head") + "</b> in this coin toss experiment.<br> Thus, the value of the Bernoulli random variable is <b>X=" + result + "</b>.<br>";
    document.getElementById("observations").innerHTML = observation;
}

function reset() {
    document.getElementById("input-p-bernoulli").value = 0.5;
    document.getElementById("input-p-bernoulli-div").style.display = "block";
    document.getElementById("bernoulli-instance").style.display = "none";
    document.getElementById("bernoulli-instance-btn").disabled = false;
    document.getElementById("observations").innerHTML = "";
    document.getElementById("bernoulli-result").innerHTML = "";
}
