var p;
var result;
var counter = 0;
var tossAnimationCount = 0;
const maxCounter = 40; // Safety limit
var previousResp = [];
var tossBtn, runBtn;

document.addEventListener("DOMContentLoaded", function () {
    tossBtn = document.getElementById("geometric-instance-btn");
    runBtn = document.getElementById("run-till-heads-btn");
    reset();
});

function setPGeometric() {
    p = document.getElementById("input-p-geometric").value;
    p = parseFloat(p);
    if (isNaN(p) || p <= 0 || p > 1) { // p cannot be 0 for this experiment
        alert("Invalid P(H) value. Please enter a number greater than 0 and up to 1.");
        return;
    }
    document.getElementById("input-p-div").style.display = "none";
    document.getElementById("geometric-instance").style.display = "block";
    document.getElementById("geometric-counter-div").style.display = "block";
    document.getElementById("prev-resp").style.display = "grid";
    document.getElementById("p-geometric-value").innerHTML = p;
}

function tossCoinForGeometric() {
    tossBtn.disabled = true;
    runBtn.disabled = true;
    document.getElementById("geometric-result").innerHTML = "Flipping...";

    // --- Animation ---
    var coin = document.getElementById("coin");
    coin.style.transition = 'none';
    coin.style.transform = `rotateY(${tossAnimationCount * 1800}deg)`;
    coin.offsetHeight; // Reflow

    result = (Math.random() < p) ? 1 : 0; // 1 for Heads, 0 for Tails
    tossAnimationCount++;

    coin.style.transition = 'transform 1.5s ease-out';
    var finalRotation = tossAnimationCount * 1800 + (result === 0 ? 180 : 0);
    coin.style.transform = `rotateY(${finalRotation}deg)`;

    // --- Update UI after animation ---
    return new Promise(resolve => {
        setTimeout(() => {
            var outcomeText = (result === 0 ? "Tail" : "Head");
            document.getElementById("geometric-result").innerHTML = "Outcome: <b>" + outcomeText + "</b>";
            updateExperimentState();
            if (result === 0 && counter < maxCounter) { // Re-enable buttons if not done
                tossBtn.disabled = false;
                runBtn.disabled = false;
            }
            resolve(result); // Resolve promise with the outcome
        }, 1600);
    });
}

async function runTillHeads() {
    tossBtn.disabled = true;
    runBtn.disabled = true;
    
    while(true) {
        const outcome = await tossCoinForGeometric();
        if (outcome === 1 || counter >= maxCounter) {
            break; // Stop if we got a head or hit the limit
        }
        // Small delay between automated tosses
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}


function updatePreviousResp(outcome) {
    previousResp.push(outcome);
    // Display the last 10 results
    var displaySlice = previousResp.slice(-10);
    for (var i = 1; i <= 10; i++) {
        var el = document.getElementById("res" + i);
        if (i <= displaySlice.length) {
            el.innerText = displaySlice[i - 1];
        } else {
            el.innerText = "-";
        }
    }
}

function updateExperimentState() {
    counter++;
    document.getElementById("geometric-counter").innerHTML = counter;
    updatePreviousResp(result === 1 ? 'H' : 'T');

    if (counter >= maxCounter && result === 0) {
        showObservations(true); // Reached max trials
    }
    if (result === 1) {
        showObservations(false); // Success
    }
}

function showObservations(maxedOut) {
    var obsEl = document.getElementById("observations");
    if (maxedOut) {
        obsEl.innerHTML = `<p><b>Experiment Limit Reached!</b></p><hr><p>We reached the maximum of ${maxCounter} trials without getting a Head. This is unlikely but possible with a low p-value.</p><p>Please try again or use a higher P(H).</p>`;
        obsEl.style.color = "red";
        return;
    }
    
    var q = 1 - p;
    var probOfOutcome = Math.pow(q, counter - 1) * p;

    var extraNote = "";
    if (counter > 10) {
        extraNote = `<br><p><i>Note: It took over 10 trials to succeed. With P(H)=${p}, longer waits like this are possible, though less frequent than shorter ones.</i></p>`;
    }

    var observation = `
        <p><b>Success!</b></p>
        <hr>
        <p><b>1. Outcome:</b></p>
        <p>We got the first Head on the <b>${counter}${getOrdinal(counter)}</b> trial.</p>
        <hr>
        <p><b>2. Geometric RV Value:</b></p>
        <p>The random variable \(X\) counts trials to get the first success. Therefore, <b>X = ${counter}</b>.</p>
        <hr>
        <p><b>3. Probability:</b></p>
        <p>The theoretical probability of this specific outcome is P(X=${counter}) = (1-p)<sup>${counter-1}</sup>p, which is <b>${probOfOutcome.toExponential(4)}</b>.</p>
        ${extraNote}
    `;
    obsEl.innerHTML = observation;
}

function getOrdinal(n) {
    if (n > 3 && n < 21) return 'th';
    switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
    }
}

function reset() {
    counter = 0;
    tossAnimationCount = 0;
    previousResp = [];
    var coin = document.getElementById("coin");
    if(coin) {
        coin.style.transition = 'none';
        coin.style.transform = 'rotateY(0deg)';
    }

    document.getElementById("geometric-counter").innerHTML = counter;
    document.getElementById("input-p-geometric").value = 0.5;
    document.getElementById("input-p-div").style.display = "block";
    document.getElementById("geometric-instance").style.display = "none";
    if(tossBtn) tossBtn.disabled = false;
    if(runBtn) runBtn.disabled = false;
    document.getElementById("observations").innerHTML = "Set a probability and toss until you get a Head.";
    document.getElementById("observations").style.color = "black";
    document.getElementById("geometric-result").innerHTML = "-";
    document.getElementById("geometric-counter-div").style.display = "none";    
    document.getElementById("prev-resp").style.display = "none";
    for(var i = 1; i <= 10; i++) {
        document.getElementById("res" + i).innerText = "-";
    }
}