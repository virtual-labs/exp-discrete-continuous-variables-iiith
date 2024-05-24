document.addEventListener("DOMContentLoaded", function() {
    reset();
});

function binomialCoefficient (n, k){  
    if(k < 0 || k > n){ 
      return 0 
    } 
    
    if(k === 0 || k === n){ 
      return 1 
    } 
    
    if(k === 1 || k === n - 1){ 
      return n 
    } 
    
    let res = n; 
    for(let i = 2; i <= k; i++){ 
      res *= (n - i + 1) / i; 
    } 
    
    return Math.round(res); 
} 


function factorial(n){
    var temporary = 1;

    if(n==0 || n==1)
        return 1;
    for(var i = 1; i<=n; i++)
        temporary = temporary *i;

    return temporary;
}

var p = document.getElementById("inputProbability");
var result;
var binomialAns1;
var binomialAns2;
var binomialAns3;
var poissonAns1;
var poissonAns2;
var poissonAns3;

var expResult1 = document.getElementById("binomialResult1");
var expResult2 = document.getElementById("binomialResult2");
var expResult3 = document.getElementById("binomialResult3");

var obs = document.getElementById("observations")

var fixedProbValue = document.getElementById("probabilityValue");
var fixednumofexp = document.getElementById("experimentsValue")

var headCount1 = document.getElementById("numOfHeads1");
var tailCount1 = document.getElementById("numOfTails1");
var headCount2 = document.getElementById("numOfHeads2");
var tailCount2 = document.getElementById("numOfTails2");
var headCount3 = document.getElementById("numOfHeads3");
var tailCount3 = document.getElementById("numOfTails3");

var temp = 1;
var lambda = 0;

var nFinal = document.getElementById("numofexperiments");

function setPPoisson() {
    var prob = parseFloat(p.value);
    var n = parseInt(nFinal.value)
    if (prob < 0 || prob > 1) {
        alert("Invalid P(H) value");
        return;
    }
    if(n < 10 || n > 200){
        alert("Range of n for the sake of the experiement is between 10 and 200");
        return;
    }
    document.getElementById("inputDiv").style.display = "none";
    document.getElementById("binomialDiv").style.display = "block";    
    fixedProbValue.innerHTML = prob;
    fixednumofexp.innerHTML = n;

    lambda = n* prob;
}

function Poisson() {
    var exp = parseInt(fixednumofexp.innerText);
    if(temp > 3){
        alert("Experiment limit reached");
        return;
    }
    for(var i = 0; i < exp; i++){
        var random = Math.random();
        var prob = parseFloat(fixedProbValue.innerText);
        result = (random < prob) ? 1 : 0;
        if(temp == 1){
            if(result == 1)
                headCount1.innerText = 1 + parseInt(headCount1.innerText);
            else
                tailCount1.innerText = 1 + parseInt(tailCount1.innerText);
        
            if(parseInt(tailCount1.innerText) + parseInt(headCount1.innerText) == exp){
                binomialAns1 = parseFloat(binomialCoefficient(exp, parseInt(headCount1.innerText)) * Math.pow(prob, parseInt(headCount1.innerText)) * Math.pow(1-prob, parseInt(tailCount1.innerText))).toFixed(4);

                poissonAns1 = parseFloat(Math.pow(2.73, -lambda) * Math.pow(lambda, parseInt(headCount1.innerText) )/factorial(parseInt(headCount1.innerText))).toFixed(4)

                var obs1 = "#H<sub>Exp 1</sub>: " + headCount1.innerText+", P<sub>Binomial</sub>(X = " + headCount1.innerText+") is: "+ binomialAns1+", and P<sub>Poisson</sub>(X = "+ headCount1.innerText+") is: "+ poissonAns1+". <br>";
                obs.innerHTML += obs1;
            }
        }
        else if( temp == 2){
            if(result == 1)
                headCount2.innerText = 1 + parseInt(headCount2.innerText);
            else
                tailCount2.innerText = 1 + parseInt(tailCount2.innerText);
            if(parseInt(tailCount2.innerText) + parseInt(headCount2.innerText) == exp){
                binomialAns2 = parseFloat(binomialCoefficient(exp, parseInt(headCount2.innerText)) * Math.pow(prob, parseInt(headCount2.innerText)) * Math.pow(1-prob, parseInt(tailCount2.innerText))).toFixed(4);

                poissonAns2 = parseFloat(Math.pow(2.73, -lambda) * Math.pow(lambda, parseInt(headCount2.innerText) )/factorial(parseInt(headCount2.innerText))).toFixed(4)

                var obs2 = "#H<sub>Exp 2</sub>: " + headCount2.innerText+", P<sub>Binomial</sub>(X = " + headCount2.innerText+") is: "+ binomialAns2+", and P<sub>Poisson</sub>(X = "+ headCount2.innerText+") is: "+ poissonAns2+". <br>";
                obs.innerHTML += obs2;
            }
        }
        else{
            if(result == 1)
                headCount3.innerText = 1 + parseInt(headCount3.innerText);
            else
                tailCount3.innerText = 1 + parseInt(tailCount3.innerText);
            if(parseInt(tailCount3.innerText) + parseInt(headCount3.innerText) == exp){
                binomialAns3 = parseFloat(binomialCoefficient(exp, parseInt(headCount3.innerText)) * Math.pow(prob, parseInt(headCount3.innerText)) * Math.pow(1-prob, parseInt(tailCount3.innerText))).toFixed(4);

                poissonAns3 = parseFloat(Math.pow(2.73, -lambda) * Math.pow(lambda, parseInt(headCount3.innerText) )/factorial(parseInt(headCount3.innerText))).toFixed(4)

                var obs3 = "#H<sub>Exp 3</sub>: " + headCount3.innerText+", P<sub>Binomial</sub>(X = " + headCount3.innerText+") is: "+ binomialAns3+", and P<sub>Poisson</sub>(X = "+ headCount3.innerText+") is: "+ poissonAns3+". <br>";
                obs.innerHTML += obs3;

                document.getElementById("graphDiv").style.display="block";

                var binomData = [
                    { x: 'Experiment 1', y: binomialAns1},
                    { x: 'Experiment 2', y: binomialAns2},
                    { x: 'Experiment 3', y: binomialAns3 }
                ];
                
                var poissonData = [
                    { x: 'Experiment 1', y: poissonAns1 },
                    { x: 'Experiment 2', y: poissonAns2 },
                    { x: 'Experiment 3', y: poissonAns3 }
                ];

                
                // Update chart data
                pointsChart.data.datasets[0].data = binomData;
                pointsChart.data.datasets[1].data = poissonData;
    
                // Update the chart
                pointsChart.update();
            }
        }
        
    }

    temp++;
}

function Poisson3(){
    var remaining = 3 - temp + 1

    if(remaining == 0){
        alert("Experiment limit reached");
        return;
    }
    for(var i = 0; i < remaining; i++)
        Poisson();
}



function reset() {
    p.value = 0.5;
    nFinal.value = 10;
    document.getElementById("inputDiv").style.display = "block";
    document.getElementById("binomialDiv").style.display = "none";
    document.getElementById("graphDiv").style.display="none";
    obs.innerText = "";
    expResult1.innerText = "Experiment 1: ";
    expResult2.innerText = "Experiment 2: ";
    expResult3.innerText = "Experiment 3: ";


    headCount1.innerText = 0;
    tailCount1.innerText = 0;
    headCount2.innerText = 0;
    tailCount2.innerText = 0;
    headCount3.innerText = 0;
    tailCount3.innerText = 0;

    temp = 1;
}


var ctx = document.getElementById('pointsChart').getContext('2d');
var pointsChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
                label: 'Binomial probabilities',
                data: [
                    { x: 'Experiment 1', y: 0 },
                    { x: 'Experiment 2', y: 10 },
                    { x: 'Experiment 3', y: 5 }
                ],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Poisson probabilities',
                data: [
                    { x: 'Experiment 1', y: -5 },
                    { x: 'Experiment 2', y: 20 },
                    { x: 'Experiment 3', y: -10 }
                ],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    },
    options: {
        scales: {
            x: {
                position: 'bottom',
                label: "Experiment",
                type: 'category',
                labels: ['Experiment 1', 'Experiment 2', 'Experiment 3'],
                ticks: {
                    stepSize: 1
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});