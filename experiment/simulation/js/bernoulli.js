var p;
var result;
var tossCount = 0; // to keep track of tosses for animation

// on dom load
document.addEventListener("DOMContentLoaded", function() {
    reset();
});

function setPbernoulli() {
    p = document.getElementById("input-p-bernoulli").value;
    p = parseFloat(p);
    if (isNaN(p) || p < 0 || p > 1) {
        alert("Invalid P(H) value. Please enter a number between 0 and 1.");
        return;
    }
    document.getElementById("input-p-bernoulli-div").style.display = "none";
    document.getElementById("bernoulli-instance").style.display = "block";    
    document.getElementById("p-bernoulli-value").innerHTML = p;
    document.getElementById("q-bernoulli-value").innerHTML = (1 - p).toFixed(2);
}

function bernoulli() {
    document.getElementById("bernoulli-instance-btn").disabled = true;
    document.getElementById("bernoulli-result").innerHTML = "Flipping...";
    document.getElementById("observations").innerHTML = "";

    var coin = document.getElementById("coin");
    
    // Reset any previous animation state and determine the outcome
    coin.style.transition = 'none'; // Disable transition for the reset
    coin.style.transform = `rotateY(${tossCount * 1800}deg)`; // Maintain current visual side
    
    var random = Math.random();
    result = (random < p) ? 1 : 0; // 1 for Heads, 0 for Tails
    tossCount++; // Increment toss count for continuous spinning effect

    // Force a reflow to apply the reset before adding the new animation
    coin.offsetHeight; 

    // Add the transition back and start the animation
    coin.style.transition = 'transform 1.5s ease-out';
    var finalRotation = tossCount * 1800 + (result === 0 ? 180 : 0); // End on Tails (180deg) or Heads (0deg)
    coin.style.transform = `rotateY(${finalRotation}deg)`;

    // After the animation finishes, show the result
    setTimeout(() => {
        var outcomeText = (result === 1) ? "Head" : "Tail";
        document.getElementById("bernoulli-result").innerHTML = "Outcome: <b>" + outcomeText + "</b>";
        showObservations();
        document.getElementById("bernoulli-instance-btn").disabled = false;
    }, 1600); // 1.6 seconds, slightly after animation ends
}

function showObservations() {
    var outcomeText = (result === 1) ? "Head" : "Tail";
    var probabilityOfOutcome = (result === 1) ? p : (1 - p);
    
    var observation = `
        <p><b>1. Outcome:</b></p>
        <p>The coin toss resulted in a <b>${outcomeText}</b>.</p>
        <hr>
        <p><b>2. Bernoulli RV Value:</b></p>
        <p>Since we map 'Head' to X=1 (success) and 'Tail' to X=0 (failure), the value of the Bernoulli random variable for this trial is <b>X = ${result}</b>.</p>
        <hr>
        <p><b>3. Probability:</b></p>
        <p>The probability of getting this specific outcome was <b>${probabilityOfOutcome.toFixed(2)}</b>.</p>
        <br>
        <p>This single experiment is a 'Bernoulli trial'. If you were to repeat this many times, you would expect to see Heads approximately ${Math.round(p*100)}% of the time.</p>
    `;
    document.getElementById("observations").innerHTML = observation;
}

function reset() {
    tossCount = 0;
    var coin = document.getElementById("coin");
    if(coin) {
        coin.style.transition = 'none';
        coin.style.transform = 'rotateY(0deg)';
    }

    document.getElementById("input-p-bernoulli").value = 0.5;
    document.getElementById("input-p-bernoulli-div").style.display = "block";
    document.getElementById("bernoulli-instance").style.display = "none";
    document.getElementById("bernoulli-instance-btn").disabled = false;
    document.getElementById("observations").innerHTML = "Set a probability and toss the coin to see observations.";
    document.getElementById("bernoulli-result").innerHTML = "";
}