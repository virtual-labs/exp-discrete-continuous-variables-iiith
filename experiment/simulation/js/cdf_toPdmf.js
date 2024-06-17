// fixing the continuous RV to be uniform and discrete RV to have only 5 points with non-zero probability
var uniform_cdf_params;    // [x_left, x_right]
var discrete_cdf_params;    // [p1, p2, p3, p4, p5]
var RV_type = "none";
// on dom load

document.addEventListener("DOMContentLoaded", function () {
    reset();
});
const ctx_cont = document.getElementById('cont-cdf-canvas-elem').getContext('2d');
const ctx_disc = document.getElementById('disc-cdf-canvas-elem').getContext('2d');
var uniformChart = new Chart(ctx_cont, {
    type: 'line',
    data: {
        labels: [0,1,2,3],
        datasets: [{
            label: 'CDF',
            data: [0,1,2,3],
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'X'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'F(x)'
                }
            }

        }
    }
});
var discreteChart = new Chart(ctx_disc, {
    type: 'line', // Specify the chart type
    data: {
        labels: [-7,1,3,7], // X-axis labels
        datasets: [{
            label: 'CDF Points', // Name the dataset
            data: [0,0.5,1,1], // Data points
            fill: false, // No fill under the line
            borderColor: 'rgb(75, 192, 192)', // Line color
            stepped: 'before', // Stepped line type
            tension: 0 // No line tension for steps
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'x'
                },
                ticks: {
                    stepSize: 1
                },
                min: -7,
                max: 7
            },
            y: {
                title: {
                    display: true,
                    text: 'F(x)'
                },
                ticks: {
                    stepSize: 0.1
                },
                min: 0,
                max: 1,
                beginAtZero: true
            }
        }
    }
});
function generateUniformCDF() {
    var num1 = Math.floor(Math.random() * 10) - 5;
    var num2 = Math.floor(Math.random() * 10) - 5;
    if (num1 == num2) {
        num2++;
    }
    if (num1 > num2) {
        var temp = num1;
        num1 = num2;
        num2 = temp;
    }
    uniform_cdf_params = [num1, num2];
    document.getElementById('cont-cdf-canvas-elem').style.display = "block";
    uniformChart.data.labels = [-7,num1,num2,7];
    uniformChart.data.datasets[0].data = [0, 0, 1, 1];
    uniformChart.update();
}
function discProbs(n) {
    var probs = [];
    var sum = 0;
    for (var i = 0; i < n-1; i++) {
        var num = Math.random() * ((1 - sum)*.7);
        if(num<0.01)
            num += 0.01;
        num = Number(num.toFixed(2));
        sum += num;
        probs.push(num);
    }
    probs.push(Number((1 - sum).toFixed(2)));
    return probs;
}
function generateDiscreteCDF() {
    const probs = discProbs(5);
    var nums = [-5,-3,0,2,5]
    var probs2 = [];
    var sum = 0;
    for (var i = 0; i < probs.length; i++) {
        sum += probs[i];
        probs2.push(sum);
    }
    discrete_cdf_params = [[...probs],[...nums]];
    document.getElementById('disc-cdf-canvas-elem').style.display = "block";
    discreteChart.data.labels = [-7,...nums,7];
    discreteChart.data.datasets[0].data = [0, ...probs2, 1];
    discreteChart.update();
}

function generateCDF() {
    var randomNumber = Math.random();
    document.getElementById("generate-cdf-button").style.display = "none";
    if (randomNumber < 0.5) {
        RV_type = "uniform";
        generateUniformCDF();
    }
    else {
        RV_type = "discrete";
        generateDiscreteCDF();
    }
    document.getElementById("select-rv-type").style.display = "block";
}

function rvType() {
    var value = document.getElementById("rv-type").value;
    if (value == 'discrete') {
        document.getElementById("pmf-resp").style.display = "block";
        document.getElementById("pdf-resp").style.display = "none";
    } else if (value == 'continuous') {
        document.getElementById("pdf-resp").style.display = "block";
        document.getElementById("pmf-resp").style.display = "none";
    } else {
        document.getElementById("pdf-resp").style.display = "none";
        document.getElementById("pmf-resp").style.display = "none";
        ShowObservation(["Incorrect!","Invalid random variable type."]);
    }
}

function pdf() {
    if (RV_type == "uniform") {
        var pdfVal = document.getElementById("pdf-val").value;
        var pdfleft = document.getElementById("pdf-left").value;
        var pdfright = document.getElementById("pdf-right").value;
        if (pdfleft == uniform_cdf_params[0] && pdfright == uniform_cdf_params[1] && pdfVal >= 1 / (uniform_cdf_params[1] - uniform_cdf_params[0]) - 0.01 && pdfVal <= 1 / (uniform_cdf_params[1] - uniform_cdf_params[0]) + 0.01){
            ShowObservation(["Correct!"]);
        } else {
            var obs = ["Incorrect!"];
            if(pdfleft != uniform_cdf_params[0]){
                obs.push("The left value is incorrect.");
            }
            if(pdfright != uniform_cdf_params[1]){
                obs.push("The right value is incorrect.");
            }
            if(pdfVal < 1 / (uniform_cdf_params[1] - uniform_cdf_params[0]) - 0.01 && pdfVal > 1 / (uniform_cdf_params[1] - uniform_cdf_params[0]) + 0.01){
                obs.push("The pdf value is incorrect.");
            }
            ShowObservation(obs);
        }
    }
    else if (RV_type == "discrete") {
        ShowObservation(["Incorrect!","This is a discrete random variable. It has a pmf not a pdf."])
    }
}
function pmf() {
    if (RV_type == "discrete") {
        var pmf_p1 = document.getElementById("pmf-p1").value;
        var pmf_p2 = document.getElementById("pmf-p2").value;
        var pmf_p3 = document.getElementById("pmf-p3").value;
        var pmf_p4 = document.getElementById("pmf-p4").value;
        var pmf_p5 = document.getElementById("pmf-p5").value;
        var discreteRV_pmf_vals = discrete_cdf_params[0];
        console.log(discreteRV_pmf_vals);
        if (pmf_p1 == discreteRV_pmf_vals[0] && pmf_p2 == discreteRV_pmf_vals[1] && pmf_p3 == discreteRV_pmf_vals[2] && pmf_p4 == discreteRV_pmf_vals[3] && pmf_p5 == discreteRV_pmf_vals[4]) {
            document.getElementById("observations1").innerText = "Correct!";
        }
        else {
            var obs = ["Incorrect!"];
            if(pmf_p1 != discreteRV_pmf_vals[0]){
                obs.push("The first pmf value is incorrect.");
            }
            if(pmf_p2 != discreteRV_pmf_vals[1]){
                obs.push("The second pmf value is incorrect.");
            }
            if(pmf_p3 != discreteRV_pmf_vals[2]){
                obs.push("The third pmf value is incorrect.");
            }
            if(pmf_p4 != discreteRV_pmf_vals[3]){
                obs.push("The fourth pmf value is incorrect.");
            }
            if(pmf_p5 != discreteRV_pmf_vals[4]){
                obs.push("The fifth pmf value is incorrect.");
            }
            ShowObservation(obs);
        }
    }
    else if (RV_type == "uniform") {
        ShowObservation(["Incorrect!","This is a continuous random variable. It has a pdf not a pmf."]);
    
    }
}

function ShowObservation(obs) {
    var obsStr = "<b>"+obs[0]+"</b><br>";
    for (var i = 1; i < obs.length; i++) {
        obsStr += obs[i] + "<br>";
    }
    document.getElementById("observations1").innerHTML = obsStr;
}

function reset() {
    RV_type = "none";
    document.getElementById("generate-cdf-button").style.display = "block";
    document.getElementById("cdf-img-elem").style.display = "none";
    document.getElementById("select-rv-type").style.display = "none";
    document.getElementById("pdf-resp").style.display = "none";
    document.getElementById("pmf-resp").style.display = "none";
    document.getElementById('disc-cdf-canvas-elem').style.display = "none";
    document.getElementById('cont-cdf-canvas-elem').style.display = "none";
    document.getElementById("observations1").innerText = "";
    document.getElementById("pdf-val").value = "";
    document.getElementById("pdf-left").value = "";
    document.getElementById("pdf-right").value = "";
    document.getElementById("pmf-p1").value = "";
    document.getElementById("pmf-p2").value = "";
    document.getElementById("pmf-p3").value = "";
    document.getElementById("pmf-p4").value = "";
    document.getElementById("pmf-p5").value = "";
    document.getElementById("rv-type").value = "none";
}
