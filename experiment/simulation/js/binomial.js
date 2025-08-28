document.addEventListener("DOMContentLoaded", function() {
    reset();
});

// Helper function for combinations
function binomialCoefficient (n, k){  
    if(k < 0 || k > n) return 0;
    if(k === 0 || k === n) return 1;
    if(k === 1 || k === n - 1) return n;
    let res = n; 
    for(let i = 2; i <= k; i++) res *= (n - i + 1) / i; 
    return Math.round(res); 
} 

// Global variables
var p = document.getElementById("inputProbability");
var result;

var coinFlipsEl = document.getElementById("numOfCoinFlips");
var expResultEl = document.getElementById("binomialResult");
var obsEl = document.getElementById("observations");
var fixedProbValueEl = document.getElementById("probabilityValue");
var headCountEl = document.getElementById("numOfHeads");
var tailCountEl = document.getElementById("numOfTails");
var tossBtn = document.getElementById("binomialInstance");
var toss10Btn = document.getElementById("binomial10Xinstance");

var tossAnimationCount = 0;
var nFinal = 10;

function setPBinomial() {
    var prob = parseFloat(p.value);
    if (isNaN(prob) || prob < 0 || prob > 1) {
        alert("Invalid P(H) value. Please enter a number between 0 and 1.");
        return;
    }
    document.getElementById("inputDiv").style.display = "none";
    document.getElementById("binomialDiv").style.display = "block";    
    fixedProbValueEl.innerHTML = prob.toFixed(2);
}

function performToss() {
    // Disable buttons during animation
    tossBtn.disabled = true;
    toss10Btn.disabled = true;
    expResultEl.innerHTML = "Flipping...";
    
    // --- Animation Logic ---
    var coin = document.getElementById("coin");
    coin.style.transition = 'none';
    coin.style.transform = `rotateY(${tossAnimationCount * 1800}deg)`;
    coin.offsetHeight; // Reflow

    var prob = parseFloat(fixedProbValueEl.innerText);
    result = (Math.random() < prob) ? 1 : 0; // 1 for Heads, 0 for Tails
    tossAnimationCount++;

    coin.style.transition = 'transform 1.5s ease-out';
    var finalRotation = tossAnimationCount * 1800 + (result === 0 ? 180 : 0);
    coin.style.transform = `rotateY(${finalRotation}deg)`;

    // --- Update UI after animation ---
    setTimeout(() => {
        var currentFlips = parseInt(coinFlipsEl.innerText);
        if (currentFlips >= nFinal) return; // Stop if we've already done 10 flips

        expResultEl.innerHTML  = "Current Toss: <b>"+(result === 0 ? "Tail" : "Head")+"</b>";
        coinFlipsEl.innerText = 1 + currentFlips;

        var prevresult = "res" + (1 + currentFlips);
        if (result === 1) {
            document.getElementById(prevresult).innerText = "H";
            headCountEl.innerText = 1 + parseInt(headCountEl.innerText);
        } else {
            document.getElementById(prevresult).innerText = "T";
            tailCountEl.innerText = 1 + parseInt(tailCountEl.innerText);
        }
            
        // Check if experiment is complete
        if (parseInt(coinFlipsEl.innerText) === nFinal) {
            showObservations();
            tossBtn.disabled = true; // Final state
            toss10Btn.disabled = true;
        } else {
            // Re-enable buttons if not complete
            tossBtn.disabled = false;
            toss10Btn.disabled = false;
        }
    }, 1600);
}

function binomial() {
    if (parseInt(coinFlipsEl.innerText) < nFinal) {
        performToss();
    }
}

function binomial10() {
    var remaining = nFinal - parseInt(coinFlipsEl.innerText);
    if (remaining <= 0) return;

    // Chain the animations with a delay
    for (let i = 0; i < remaining; i++) {
        setTimeout(performToss, i * 1700); // Stagger tosses slightly more than animation time
    }
}

function showObservations() {
    var prob = parseFloat(fixedProbValueEl.innerText);
    var numHeads = parseInt(headCountEl.innerText);
    var numTails = parseInt(tailCountEl.innerText);
    
    var randomVariableAns = binomialCoefficient(nFinal, numHeads) * Math.pow(prob, numHeads) * Math.pow(1 - prob, numTails);

    var observation = `
        <p><b>Experiment Complete!</b></p>
        <hr>
        <p><b>1. Final Count:</b></p>
        <p>Out of 10 trials, we observed <b>${numHeads} Heads</b> and <b>${numTails} Tails</b>.</p>
        <hr>
        <p><b>2. Binomial RV Value:</b></p>
        <p>The random variable \(X\) counts the number of heads, so for this experiment, <b>X = ${numHeads}</b>.</p>
        <hr>
        <p><b>3. Theoretical vs. Experimental:</b></p>
        <p>The theoretical probability of getting exactly ${numHeads} heads is P(X=${numHeads}) = <b>${randomVariableAns.toFixed(4)}</b>.</p>
        <p>Your experimental probability from this one set of 10 flips was <b>${(numHeads / nFinal).toFixed(2)}</b>.</p>
        <p>The overall expected (average) number of heads is n*p = ${nFinal} * ${prob} = <b>${(nFinal * prob).toFixed(2)}</b>.</p>
    `;
    obsEl.innerHTML = observation;
}

function reset() {
    p.value = 0.5;
    tossAnimationCount = 0;
    var coin = document.getElementById("coin");
    if(coin) {
        coin.style.transition = 'none';
        coin.style.transform = 'rotateY(0deg)';
    }

    document.getElementById("inputDiv").style.display = "block";
    document.getElementById("binomialDiv").style.display = "none";
    
    obsEl.innerHTML = "Set a probability and complete 10 tosses.";
    expResultEl.innerHTML = "Current Toss: -";
    coinFlipsEl.innerText = 0;
    headCountEl.innerText = 0;
    tailCountEl.innerText = 0;

    tossBtn.disabled = false;
    toss10Btn.disabled = false;

    for(var i = 1; i <= 10; i++) {
        document.getElementById("res" + i).innerText = "-";
    }
}