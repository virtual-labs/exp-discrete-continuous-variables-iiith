var p;
var result;
var counter = 0;
var headCounter = 0;
var tailCounter = 0;
var n = 10;

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
    document.getElementById("binomial-counter-div").style.display = "block";
}
function bernoulli() {
    var random = Math.random();
    result = (random < p) ? 1 : 0;
    document.getElementById("bernoulli-result").innerHTML = "<b>"+(result==0?"Tail":"Head")+"</b>";

    updateCounter();
}

function updateCounter() {
    counter++;
    if (result == 0) {
        tailCounter++;
    } else {
        headCounter++;
    }
    document.getElementById("binomial-counter").innerHTML = counter;
    document.getElementById("binomial-heads").innerHTML = headCounter;
    document.getElementById("binomial-tails").innerHTML = tailCounter;
    if (counter == n) {
        document.getElementById("bernoulli-instance-btn").disabled = true;
        showObservations();
    }
}

function showObservations() {
    var observation = "We got <b>" + headCounter+ " Heads</b> in this experiment for <b>N = "+n+"</b> trials. Thus, the value of the Binomial random variable is <b>X=" + headCounter + "</b>.<br>";
    document.getElementById("observations").innerHTML = observation;
}

function reset() {
    document.getElementById("input-p-bernoulli").value = 0.5;
    document.getElementById("input-p-bernoulli-div").style.display = "block";
    document.getElementById("bernoulli-instance").style.display = "none";
    document.getElementById("bernoulli-instance-btn").disabled = false;
    document.getElementById("observations").innerHTML = "";
    document.getElementById("bernoulli-result").innerHTML = "";

    counter = 0;
    headCounter = 0;
    tailCounter = 0;
    document.getElementById("binomial-counter").innerHTML = counter;
    document.getElementById("binomial-heads").innerHTML = headCounter;
    document.getElementById("binomial-tails").innerHTML = tailCounter;
    document.getElementById("binomial-counter-div").style.display = "none";
}
