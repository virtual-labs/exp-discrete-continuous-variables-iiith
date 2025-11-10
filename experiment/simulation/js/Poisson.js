// --- Chart.js Setup ---
var pmfChart, linechartCtx;

// --- DOM Element Refs ---
var lambdaEl, p1El, p2El, p3El, n1El, n2El, n3El, obsEl, statusEl;
var probVal1, probVal2, probVal3, expVal1, expVal2, expVal3;
var head1, tail1, head2, tail2, head3, tail3;

// --- State ---
var lambda;

// --- Numerically Stable Math Helper Functions ---

// Cache for logFactorial to avoid re-computation
const logFactorialCache = [0]; 
function logFactorial(n) {
    if (n < 0) return -Infinity;
    n = Math.floor(n);
    if (n < logFactorialCache.length) return logFactorialCache[n];
    for (let i = logFactorialCache.length; i <= n; i++) {
        logFactorialCache[i] = logFactorialCache[i - 1] + Math.log(i);
    }
    return logFactorialCache[n];
}

function binomialPMF(x, n, p) {
    if (p < 0 || p > 1 || x < 0 || x > n) return 0;
    if (p === 0) return x === 0 ? 1 : 0;
    if (p === 1) return x === n ? 1 : 0;

    // Calculate using logs to prevent overflow with large n
    const logCombinations = logFactorial(n) - logFactorial(x) - logFactorial(n - x);
    const logProb = logCombinations + x * Math.log(p) + (n - x) * Math.log(1 - p);
    
    return Math.exp(logProb);
}

function poissonPMF(x, lam) {
    if (x < 0) return 0;
    // Use log version for consistency and stability
    const logProb = x * Math.log(lam) - lam - logFactorial(x);
    return Math.exp(logProb);
}


// --- Main Functions ---
document.addEventListener("DOMContentLoaded", function() {
    // Get all DOM elements
    lambdaEl = document.getElementById("inputLambda");
    p1El = document.getElementById("inputProbability1");
    p2El = document.getElementById("inputProbability2");
    p3El = document.getElementById("inputProbability3");
    n1El = document.getElementById("numofexperiments1");
    n2El = document.getElementById("numofexperiments2");
    n3El = document.getElementById("numofexperiments3");
    obsEl = document.getElementById("observations");
    statusEl = document.getElementById("simulation-status");
    probVal1 = document.getElementById("probabilityValue1");
    probVal2 = document.getElementById("probabilityValue2");
    probVal3 = document.getElementById("probabilityValue3");
    expVal1 = document.getElementById("experimentsValue1");
    expVal2 = document.getElementById("experimentsValue2");
    expVal3 = document.getElementById("experimentsValue3");
    head1 = document.getElementById("numOfHeads1");
    tail1 = document.getElementById("numOfTails1");
    head2 = document.getElementById("numOfHeads2");
    tail2 = document.getElementById("numOfTails2");
    head3 = document.getElementById("numOfHeads3");
    tail3 = document.getElementById("numOfTails3");

    linechartCtx = document.getElementById('linechart').getContext('2d');
    initializeChart();
    reset();
});


function setPPoisson() {
    var prob1 = parseFloat(p1El.value);
    var n1 = parseInt(n1El.value);
    var prob2 = parseFloat(p2El.value);
    var n2 = parseInt(n2El.value);
    var prob3 = parseFloat(p3El.value);
    var n3 = parseInt(n3El.value);
    
    // Validation
    const validations = [
        { p: prob1, n: n1, minN: 10, maxN: 50, name: "1" },
        { p: prob2, n: n2, minN: 51, maxN: 100, name: "2" },
        { p: prob3, n: n3, minN: 101, maxN: 150, name: "3" }
    ];

    for (const v of validations) {
        if (isNaN(v.p) || v.p < 0 || v.p > 1) {
            alert(`Invalid p${v.name} value.`); return;
        }
        if (isNaN(v.n) || v.n < v.minN || v.n > v.maxN) {
            alert(`Range for n${v.name} is [${v.minN}, ${v.maxN}].`); return;
        }
        const currentLambda = v.n * v.p;
        if (Math.abs(currentLambda - lambda) > 0.1) {
            alert(`The product n${v.name}*p${v.name} must be close to λ = ${lambda.toFixed(2)}.`); return;
        }
    }

    probVal1.innerText = prob1.toFixed(4);
    probVal2.innerText = prob2.toFixed(4);
    probVal3.innerText = prob3.toFixed(4);
    expVal1.innerText = n1;
    expVal2.innerText = n2;
    expVal3.innerText = n3;

    // Update n values in the stats grid titles
    document.querySelectorAll('.nVal1').forEach(el => el.innerText = n1);
    document.querySelectorAll('.nVal2').forEach(el => el.innerText = n2);
    document.querySelectorAll('.nVal3').forEach(el => el.innerText = n3);

    document.getElementById("inputDiv").style.display = "none";
    document.getElementById("poissonDiv").style.display = "block";
}

function runSingleExperiment(n, p) {
    let heads = 0;
    for(let i = 0; i < n; i++) {
        if (Math.random() < p) heads++;
    }
    return { heads: heads, tails: n - heads };
}

function runAllExperiments() {
    document.getElementById("run-experiments-btn").disabled = true;
    obsEl.innerHTML = "";
    
    const experiments = [
        { n: parseInt(expVal1.innerText), p: parseFloat(probVal1.innerText), headEl: head1, tailEl: tail1 },
        { n: parseInt(expVal2.innerText), p: parseFloat(probVal2.innerText), headEl: head2, tailEl: tail2 },
        { n: parseInt(expVal3.innerText), p: parseFloat(probVal3.innerText), headEl: head3, tailEl: tail3 }
    ];

    let binomData = [];

    // Simulate and update UI
    experiments.forEach((exp, index) => {
        statusEl.innerText = `Simulating Experiment ${index + 1}...`;
        const result = runSingleExperiment(exp.n, exp.p);
        exp.headEl.innerText = result.heads;
        exp.tailEl.innerText = result.tails;
        binomData.push({n: exp.n, p: exp.p});
    });

    statusEl.innerText = "Simulations Complete!";
    updateGraph(binomData);
    showObservations();
}


function updateGraph(binomData) {
    // Determine a good range for x-axis, e.g., up to λ + 5*sqrt(λ)
    const maxX = Math.max(10, Math.ceil(lambda + 5 * Math.sqrt(lambda)));
    const labels = Array.from({length: maxX + 1}, (_, i) => i);
    
    const poissonData = labels.map(x => poissonPMF(x, lambda));
    
    pmfChart.data.labels = labels;
    pmfChart.data.datasets[3].data = poissonData; // Poisson data

    binomData.forEach((data, index) => {
        pmfChart.data.datasets[index].data = labels.map(x => binomialPMF(x, data.n, data.p));
    });

    pmfChart.update();
    document.getElementById("graphDiv").style.display="block";
}

function showObservations() {
    obsEl.innerHTML = `
        <p><b>Analysis</b></p>
        <p>The graph shows the Probability Mass Function (PMF) for each of the three Binomial experiments, plotted against the target Poisson PMF.</p>
        <hr>
        <p><b>Key Observation:</b></p>
        <p>Notice how the line for Binomial Experiment 3 (violet, with the largest 'n' and smallest 'p') is the closest to the black line of the Poisson distribution.</p>
        <p>This demonstrates the Poisson approximation: a Binomial distribution behaves like a Poisson distribution when 'n' is large, 'p' is small, and their product \(np = \lambda\) is moderate.</p>
    `;
}

function initializeChart() {
    pmfChart = new Chart(linechartCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                { label: 'Binomial PMF (n1, p1)', data: [], borderColor: 'red', fill: false, borderWidth: 2 },
                { label: 'Binomial PMF (n2, p2)', data: [], borderColor: 'green', fill: false, borderWidth: 2 },
                { label: 'Binomial PMF (n3, p3)', data: [], borderColor: 'violet', fill: false, borderWidth: 2 },
                { label: 'Poisson PMF (λ)', data: [], borderColor: 'black', fill: false, borderDash: [5, 5], borderWidth: 2 }
            ]
        },
        options: {
            responsive: true,
            plugins: { title: { display: true, text: 'Binomial vs. Poisson PMF' } },
            scales: {
                x: { title: { display: true, text: 'Number of Heads (x)' } },
                y: { title: { display: true, text: 'Probability P(X=x)' } }
            }
        }
    });
}

function reset() {
    // Generate a new random lambda between 2.0 and 8.0
    lambda = parseFloat((Math.random() * 6 + 2).toFixed(2));
    lambdaEl.innerText = lambda;

    // Suggest some initial p and n values
    n1El.value = Math.max(10, Math.round(lambda / 0.2));
    p1El.value = (lambda / n1El.value).toFixed(4);
    n2El.value = Math.max(51, Math.round(lambda / 0.1));
    p2El.value = (lambda / n2El.value).toFixed(4);
    n3El.value = Math.max(101, Math.round(lambda / 0.05));
    p3El.value = (lambda / n3El.value).toFixed(4);
    
    document.getElementById("inputDiv").style.display = "block";
    document.getElementById("poissonDiv").style.display = "none";
    document.getElementById("graphDiv").style.display="none";
    document.getElementById("run-experiments-btn").disabled = false;
    
    obsEl.innerHTML = "Set parameters and run the experiments.";
    statusEl.innerHTML = "";
    
    [head1, tail1, head2, tail2, head3, tail3].forEach(el => el.innerText = 0);

    // Clear previous chart data
    if (pmfChart) {
        pmfChart.data.labels = [];
        pmfChart.data.datasets.forEach((dataset) => {
            dataset.data = [];
        });
        pmfChart.update();
    }
}