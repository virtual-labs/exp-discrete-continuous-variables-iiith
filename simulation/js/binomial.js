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
var obsEl = document.getElementById("observations");
var fixedProbValueEl = document.getElementById("probabilityValue");
var headCountEl = document.getElementById("numOfHeads");
var tailCountEl = document.getElementById("numOfTails");
var coinFlipsEl = document.getElementById("numOfCoinFlips");

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

function tossAllCoins() {
    var tossBtn = document.getElementById("tossAllBtn");
    tossBtn.disabled = true;

    var prob = parseFloat(fixedProbValueEl.innerText);
    var results = [];
    var headCount = 0;

    // 1. Determine all outcomes
    for (let i = 0; i < nFinal; i++) {
        const result = (Math.random() < prob) ? 1 : 0; // 1 for Heads, 0 for Tails
        results.push(result);
        if (result === 1) headCount++;
    }

    // 2. Animate all coins with a random stagger
    const allCoins = document.querySelectorAll('.small-coin');
    allCoins.forEach((coin, i) => {
        var randomDelay = Math.random() * 500; // up to 0.5s delay
        
        // Reset to start before flipping
        coin.style.transition = 'none';
        coin.style.transform = `rotateY(0deg)`;
        coin.offsetHeight; // Trigger reflow to apply the reset instantly

        setTimeout(() => {
            coin.style.transition = 'transform 1.5s ease-out';
            // Each coin has its own rotation count to look more random
            const rotationCount = Math.floor(Math.random() * 2) + 4; // 4 or 5 full spins
            const finalRotation = (rotationCount * 360) + (results[i] === 0 ? 180 : 0);
            coin.style.transform = `rotateY(${finalRotation}deg)`;
        }, randomDelay);
    });

    // 3. Update UI after the longest animation finishes
    setTimeout(() => {
        coinFlipsEl.innerText = nFinal;
        headCountEl.innerText = headCount;
        tailCountEl.innerText = nFinal - headCount;
        
        showObservations();
    }, 2100); // 1.5s animation + 0.5s max delay + buffer
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
        <p><b>3. Probability Calculations:</b></p>
        <p>The theoretical probability of getting exactly ${numHeads} heads is P(X=${numHeads}) = <b>${randomVariableAns.toFixed(4)}</b>.</p>
        <p>The overall expected (average) number of heads is n*p = ${nFinal} * ${prob} = <b>${(nFinal * prob).toFixed(2)}</b>.</p>
    `;
    obsEl.innerHTML = observation;
    if (window.MathJax) {
        MathJax.typeset(); // Re-render MathJax for new content
    }
}

function reset() {
    p.value = 0.5;
    
    // Reset coins in the history grid
    const allCoins = document.querySelectorAll('.small-coin');
    allCoins.forEach(coin => {
        coin.style.transition = 'none';
        coin.style.transform = 'rotateY(0deg)';
    });

    document.getElementById("inputDiv").style.display = "block";
    document.getElementById("binomialDiv").style.display = "none";
    
    obsEl.innerHTML = "Set a probability and complete 10 tosses.";
    coinFlipsEl.innerText = 0;
    headCountEl.innerText = 0;
    tailCountEl.innerText = 0;

    var tossBtn = document.getElementById("tossAllBtn");
    if(tossBtn) tossBtn.disabled = false;
}