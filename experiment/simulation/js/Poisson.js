document.addEventListener("DOMContentLoaded", function() {
    reset();
});

var np = document.getElementById("inputLambda");
var p = document.getElementById("inputProbability");
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
var nFinal = document.getElementById("numofexperiments");
var ctx2 = document.getElementById('stepchart2').getContext('2d');
var ctx1 = document.getElementById('stepChart').getContext('2d');

const xData = [0, 1, 2, 3, 4, 5];
const yData = [0, 10, 5, 15, 10, 20];
var result;

var binomialAns1;
var binomialAns2;

var poissonAns1;
var poissonAns2;

var temp = 1;
var lambda = 0;


const dataPoints = xData.map((x, index) => ({ x: x, y: yData[index] }));
const stepChart = new Chart(ctx1, {
    type: 'bar',
    data: {
        datasets: [{
                label: 'Binomial probabilities',
                data:dataPoints,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false,
                stepped: true
            },
            {
                label: 'Poisson probabilities',
                data: dataPoints,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
                stepped: true
            }
        ]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'X Axis'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Y Axis'
                    }
                }
            }
        }
});

const stepChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        datasets: [{
                label: 'Binomial probabilities',
                data:dataPoints,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                fill: false,
                stepped: true
            },
            {
                label: 'Poisson probabilities',
                data: dataPoints,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: false,
                stepped: true
            }
        ]
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Value of the Random Variable X'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'PMF of X'
                    }
                }
            }
        }
});

function binomialCoefficient (n, k){  
    let sum = 1;
    for(let i = 1; i <= k; i++)
        sum = sum * (n - k + i) / i;
    return sum;
} 

function factorial(n){
    var temporary = 1;
    if(n==0 || n==1)
        return 1;
    for(var i = 1; i<=n; i++)
        temporary = temporary *i;
    return temporary;
}

function setPPoisson() {
    var prob = parseFloat(p.value);
    var n = parseInt(nFinal.value);
    
    if (prob < 0 || prob > 1) {
        alert("Invalid P(H) value");
        return;
    }
    
    if(n < 10 || n > 200){
        alert("Range of n for the sake of the experiement is between 10 and 200");
        return;
    }
    
    fixedProbValue.innerHTML = prob;
    fixednumofexp.innerHTML = n;

    lambda = parseFloat(n * prob).toFixed(1);

    var deltahigh = parseFloat(np.innerText) + 0.01;
    var deltalow = parseFloat(np.innerText) - 0.01;

    if(lambda < deltalow || lambda > deltahigh ){
        alert("pick n and p values such that lambda = " + np.innerText);
        return;
    }

    document.getElementById("inputDiv").style.display = "none";
    document.getElementById("binomialDiv").style.display = "block";
}

function Poisson() {
    var exp = parseInt(fixednumofexp.innerText);
    var prob = parseFloat(fixedProbValue.innerText);

    if(temp == 1){
        exp = 150;
        prob = parseFloat( parseFloat(np.innerText)/exp).toFixed(3);

        for(var i = 0; i < exp; i++){
            var random = Math.random();
            result = (random < prob) ? 1 : 0;
            if(result == 1)
                headCount1.innerText = 1 + parseInt(headCount1.innerText);
            else
                tailCount1.innerText = 1 + parseInt(tailCount1.innerText);
        }
        
        
        // binomialAns1 = parseFloat( binomialCoefficient(exp, parseInt(headCount1.innerText)) * Math.pow(prob, parseInt(headCount1.innerText)) * Math.pow(1-prob, parseInt(tailCount1.innerText)) ).toFixed(3);
        // poissonAns1 = parseFloat(Math.pow(2.73, -lambda) * Math.pow(lambda, parseInt(headCount1.innerText))/factorial(parseInt(headCount1.innerText))).toFixed(3)
        
        document.getElementById("graphDiv").style.display="block";
        var xDataNew1 = new Array();
        var yDataBinomial1 = new Array();
        var yDataPoisson1 = new Array();
        
        for(var i = 0; i <= exp; i++){
            var yBinomial1 = parseFloat(binomialCoefficient(exp, i) * Math.pow(prob, i) * Math.pow(1-prob, exp - i)).toFixed(3);
            var yPoisson1 = parseFloat( (Math.pow(2.718, -lambda) * Math.pow(lambda, i))/factorial(i) ).toFixed(3)

            if(parseInt(i) === parseInt(headCount1.innerText)){
                binomialAns1 = yBinomial1;
                poissonAns1  = yPoisson1;
            }

            if(parseFloat(yBinomial1).toFixed(3) != 0){
                xDataNew1.push(i);
                yDataBinomial1.push(parseFloat(yBinomial1));
                yDataPoisson1.push(parseFloat(yPoisson1));
            }
            else
                break;
        }

        var obs1 = "Number of H<sub>Exp 1</sub>: " + headCount1.innerText+", P<sub>Binomial</sub>(X = " + headCount1.innerText+") is: "+ binomialAns1+", and P<sub>Poisson</sub>(X = "+ headCount1.innerText+") is: "+ poissonAns1+". <br>";
        obs.innerHTML += obs1;
        
        var dp1 = xDataNew1.map((x, index) => ({ x: x, y: yDataBinomial1[index] }));
        var dp2 = xDataNew1.map((x, index) => ({ x: x, y: yDataPoisson1[index] }));
        stepChart2.data.datasets[0].data = dp1;
        stepChart2.data.datasets[1].data = dp2;
        stepChart2.update();

        
    }
    else if( temp == 2){
        for(var i = 0; i < exp; i++){
            var random = Math.random();
            result = (random < prob) ? 1 : 0;
            if(result == 1)
                headCount2.innerText = 1 + parseInt(headCount2.innerText);
            else
                tailCount2.innerText = 1 + parseInt(tailCount2.innerText);
        }
        binomialAns2 = parseFloat(binomialCoefficient(exp, parseInt(headCount2.innerText)) * Math.pow(prob, parseInt(headCount2.innerText)) * Math.pow(1-prob, parseInt(tailCount2.innerText))).toFixed(3);
        poissonAns2 = parseFloat(Math.pow(2.73, -lambda) * Math.pow(lambda, parseInt(headCount2.innerText) )/factorial(parseInt(headCount2.innerText))).toFixed(3)
        var obs2 = "Number of H<sub>Exp 2</sub>: " + headCount2.innerText+", P<sub>Binomial</sub>(X = " + headCount2.innerText+") is: "+ binomialAns2+", and P<sub>Poisson</sub>(X = "+ headCount2.innerText+") is: "+ poissonAns2+". <br>";

        var obs3 = "We can observe from the two graphs below that by keeping lambda constant and increasing n, the difference between  P<sub>Binomial</sub>(x) and  P<sub>Poisson</sub>(x) becomes smaller and smaller. It implies that the Poisson random variable is the limiting case of Binomial random variable as n grows large (tends to infinity)"
        obs.innerHTML += obs2 + obs3;


        document.getElementById("stepDiv").style.display="block";
        var xDataNew = new Array();
        var yDataBinomial = new Array();
        var yDataPoisson = new Array();
        for(var i = 0; i <= exp; i++){
            var yBinomial = parseFloat(binomialCoefficient(exp, i) * Math.pow(prob, i) * Math.pow(1-prob, exp - i)).toFixed(3);
            var yPoisson = parseFloat( (Math.pow(2.718, -lambda) * Math.pow(lambda, i))/factorial(i) ).toFixed(3)
            if(parseFloat(yBinomial).toFixed(3) != 0){
                xDataNew.push(i);
                yDataBinomial.push(parseFloat(yBinomial));
                yDataPoisson.push(parseFloat(yPoisson));
            }
            else
                break;
        }

        

        var dataPoints1 = xDataNew.map((x, index) => ({ x: x, y: yDataBinomial[index] }));
        var dataPoints2 = xDataNew.map((x, index) => ({ x: x, y: yDataPoisson[index] }));
        stepChart.data.datasets[0].data = dataPoints1;
        stepChart.data.datasets[1].data = dataPoints2;
        stepChart.update();
    }
    else{
        alert("Experiment limit reached");
        return;
    }
    temp++;      
}

function Poisson2(){
    var remaining = 2 - temp + 1

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
    var randomize = parseFloat(Math.random() * 8).toFixed(1);
    while(randomize < 1 ){
        randomize = parseFloat(Math.random() * 8).toFixed(1);
    }
    np.innerText = randomize;
    
    document.getElementById("inputDiv").style.display = "block";
    document.getElementById("binomialDiv").style.display = "none";
    document.getElementById("graphDiv").style.display="none";
    document.getElementById("stepDiv").style.display="none";
    obs.innerText = "";
    
    expResult1.innerText = "Experiment with fixed n = 150 and p = "+ parseFloat(randomize/150).toFixed(3) +" such that lambda  = " + randomize;
    expResult2.innerText = "User experiment with given n and p values: ";

    headCount1.innerText = 0;
    tailCount1.innerText = 0;

    headCount2.innerText = 0;
    tailCount2.innerText = 0;

    temp = 1;
}