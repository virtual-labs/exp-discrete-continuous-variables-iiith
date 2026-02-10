// Global variables
var uniform_cdf_params;    // [x_left, x_right]
var discrete_cdf_params;   // { probs: [p1,..], points: [x1,..] }
var RV_type = "none";
var uniformChart, discreteChart;

// Chart.js default font settings
Chart.defaults.font.family = "'Open Sans', sans-serif";
Chart.defaults.font.size = 14;

// --- Main Functions ---
document.addEventListener("DOMContentLoaded", function () {
    const ctx_cont = document.getElementById('cont-cdf-canvas-elem').getContext('2d');
    const ctx_disc = document.getElementById('disc-cdf-canvas-elem').getContext('2d');
    initializeCharts(ctx_cont, ctx_disc);
    reset();
});

function generateUniformCDF() {
    let num1 = Math.floor(Math.random() * 10) - 5;
    let num2 = Math.floor(Math.random() * 10) - 5;
    if (num1 === num2) num2++;
    if (num1 > num2) [num1, num2] = [num2, num1]; // Swap
    
    uniform_cdf_params = [num1, num2];
    document.getElementById('cont-cdf-canvas-elem').style.display = "block";
    
    uniformChart.data.labels = [num1 - 2, num1, num2, num2 + 2];
    uniformChart.data.datasets[0].data = [0, 0, 1, 1];
    uniformChart.options.scales.x.min = num1 - 2;
    uniformChart.options.scales.x.max = num2 + 2;
    uniformChart.update();
}

function discProbs(n) {
    let probs = [];
    let sum = 0;
    for (let i = 0; i < n - 1; i++) {
        let num = Math.random() * ((1 - sum) * 0.7);
        if (num < 0.05) num += 0.05; // Ensure jumps are noticeable
        num = Number(num.toFixed(2));
        sum += num;
        probs.push(num);
    }
    probs.push(Number((1 - sum).toFixed(2)));
    // Shuffle for randomness
    return probs.sort(() => Math.random() - 0.5);
}

function generateDiscreteCDF() {
    const probs = discProbs(5);
    const nums = [-4, -2, 0, 2, 4]; // Use fixed points for clarity
    let cdf_probs = [];
    let sum = 0;
    for (const p of probs) {
        sum = Number((sum + p).toFixed(2));
        cdf_probs.push(sum);
    }
    discrete_cdf_params = { probs: probs, points: nums };
    
    // Update labels for PMF inputs
    for (let i = 0; i < 5; i++) {
        document.getElementById(`pmf-l${i+1}`).innerText = `P(X = ${nums[i]})`;
    }

    document.getElementById('disc-cdf-canvas-elem').style.display = "block";
    discreteChart.data.labels = [-6, ...nums, 6];
    discreteChart.data.datasets[0].data = [0, cdf_probs[0], ...cdf_probs.slice(1), cdf_probs[4]];
    discreteChart.update();
}

function generateCDF() {
    reset();
    document.getElementById("generate-cdf-button").style.display = "none";
    if (Math.random() < 0.5) {
        RV_type = "uniform";
        generateUniformCDF();
    } else {
        RV_type = "discrete";
        generateDiscreteCDF();
    }
    document.getElementById("select-rv-type").style.display = "block";
}

// This function automatically checks the user's selection from the dropdown
function rvType() {
    const value = document.getElementById("rv-type").value;
    const isContinuous = (RV_type === "uniform");
    const isDiscrete = (RV_type === "discrete");

    // Hide both response sections initially
    document.getElementById("pmf-resp").style.display = "none";
    document.getElementById("pdf-resp").style.display = "none";

    if (value === 'continuous') {
        if (isContinuous) {
            ShowObservation(["Correct!", "This is a continuous random variable. Now, find its PDF."]);
            document.getElementById("pdf-resp").style.display = "block";
        } else {
            ShowObservation(["Incorrect RV Type!", "This CDF is a step function, which corresponds to a <b>discrete</b> random variable."]);
        }
    } else if (value === 'discrete') {
        if (isDiscrete) {
            ShowObservation(["Correct!", "This is a discrete random variable. Now, find its PMF."]);
            document.getElementById("pmf-resp").style.display = "block";
        } else {
            ShowObservation(["Incorrect RV Type!", "This CDF is a smooth line (not a step function), which corresponds to a <b>continuous</b> random variable."]);
        }
    }
}

function pdf() {
    if (RV_type !== "uniform") {
        ShowObservation(["Incorrect RV Type!", "This is a discrete random variable. It has a PMF, not a PDF."]);
        return;
    }
    
    const pdfVal = parseFloat(document.getElementById("pdf-val").value);
    const pdfleft = parseFloat(document.getElementById("pdf-left").value);
    const pdfright = parseFloat(document.getElementById("pdf-right").value);
    
    const [correct_left, correct_right] = uniform_cdf_params;
    const correct_val = 1 / (correct_right - correct_left);

    if (pdfleft === correct_left && pdfright === correct_right && Math.abs(pdfVal - correct_val) < 0.01) {
        ShowObservation(["Correct!", `The PDF is the derivative of the CDF. The slope of the CDF is 1/(${correct_right} - ${correct_left}) = ${correct_val.toFixed(3)}, which is the value of the PDF on the interval <b>[${correct_left}, ${correct_right}]</b>.`]);
    } else {
        let feedback = "One or more values are incorrect.<br>";
        if (pdfleft !== correct_left) feedback += `&bull; The lower bound should be <b>${correct_left}</b>.<br>`;
        if (pdfright !== correct_right) feedback += `&bull; The upper bound should be <b>${correct_right}</b>.<br>`;
        if (Math.abs(pdfVal - correct_val) >= 0.01) feedback += `&bull; The PDF value should be ~<b>${correct_val.toFixed(3)}</b>.<br>`;
        ShowObservation(["Incorrect!", feedback]);
    }
}

function pmf() {
    if (RV_type !== "discrete") {
        ShowObservation(["Incorrect RV Type!", "This is a continuous random variable. It has a PDF, not a PMF."]);
        return;
    }
    
    const user_pmf = Array.from({length: 5}, (_, i) => parseFloat(document.getElementById(`pmf-p${i+1}`).value));
    const correct_pmf = discrete_cdf_params.probs;
    let isCorrect = true;
    let feedback = "";

    for (let i = 0; i < 5; i++) {
        if (isNaN(user_pmf[i]) || Math.abs(user_pmf[i] - correct_pmf[i]) > 0.01) {
            isCorrect = false;
            feedback += `&bull; For P(X=${discrete_cdf_params.points[i]}), the correct jump height is <b>${correct_pmf[i]}</b>.<br>`;
        }
    }

    if (isCorrect) {
        ShowObservation(["Correct!", "The PMF values correctly correspond to the height of the jumps in the CDF at each point."]);
    } else {
        ShowObservation(["Incorrect!", feedback]);
    }
}

function ShowObservation(obs) {
    document.getElementById("observations1").style.color = (obs[0].includes("Incorrect")) ? "red" : "green";
    document.getElementById("observations1").innerHTML = `<b>${obs[0]}</b>`;
    document.getElementById("results1").innerHTML = obs.length > 1 ? obs[1] : "";
}

function reset() {
    RV_type = "none";
    document.getElementById("generate-cdf-button").style.display = "block";
    document.getElementById("select-rv-type").style.display = "none";
    document.getElementById("pdf-resp").style.display = "none";
    document.getElementById("pmf-resp").style.display = "none";
    document.getElementById('disc-cdf-canvas-elem').style.display = "none";
    document.getElementById('cont-cdf-canvas-elem').style.display = "none";
    document.getElementById("observations1").innerHTML = "";
    document.getElementById("results1").innerHTML = "";
    ['pdf-val', 'pdf-left', 'pdf-right', 'pmf-p1', 'pmf-p2', 'pmf-p3', 'pmf-p4', 'pmf-p5'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });
    document.getElementById("rv-type").value = "none";
}

/**
 * [MODIFIED] Initializes charts with a generic "CDF" label and ensures the legend is visible.
 */
function initializeCharts(ctx_cont, ctx_disc) {
    uniformChart = new Chart(ctx_cont, {
        type: 'line',
        data: { labels: [], datasets: [{ 
            label: 'CDF', // Use a generic label
            data: [], 
            borderColor: 'rgb(75, 192, 192)', 
            tension: 0 
        }] },
        options: { 
            scales: { x: { title: { display: true, text: 'x' } }, y: { beginAtZero: true, min: 0, max: 1.1, title: { display: true, text: 'F(x)' } } },
            plugins: {
                legend: { display: true }, // Ensure legend is visible
                tooltip: { callbacks: { label: (context) => `(x: ${context.parsed.x}, F(x): ${context.parsed.y})` } }
            }
        }
    });
    discreteChart = new Chart(ctx_disc, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'CDF', // Use a generic label
                data: [], 
                fill: false, 
                borderColor: 'rgb(153, 102, 255)',
                stepped: 'before', 
                pointRadius: 5, 
                pointHoverRadius: 8, 
                pointBackgroundColor: 'rgb(153, 102, 255)'
            }]
        },
        options: { 
            scales: { x: { min: -6, max: 6, title: { display: true, text: 'x' } }, y: { min: 0, max: 1.1, beginAtZero: true, title: { display: true, text: 'F(x)' } } },
            plugins: {
                legend: { display: true }, // Ensure legend is visible
                tooltip: { callbacks: { label: (context) => `(x: ${context.parsed.x}, F(x): ${context.parsed.y})` } }
            }
        }
    });
}