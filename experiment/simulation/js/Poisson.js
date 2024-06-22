document.addEventListener("DOMContentLoaded", function() {
    reset();
});

var np = document.getElementById("inputLambda");


var p1 = document.getElementById("inputProbability1");
var p2 = document.getElementById("inputProbability2");
var p3 = document.getElementById("inputProbability3");

var n1Final = document.getElementById("numofexperiments1");
var n2Final = document.getElementById("numofexperiments2");
var n3Final = document.getElementById("numofexperiments3");


var obs = document.getElementById("observations")

var fixedProbValue1 = document.getElementById("probabilityValue1");
var fixednumofexp1 = document.getElementById("experimentsValue1")

var fixedProbValue2 = document.getElementById("probabilityValue2");
var fixednumofexp2 = document.getElementById("experimentsValue2")

var fixedProbValue3 = document.getElementById("probabilityValue3");
var fixednumofexp3 = document.getElementById("experimentsValue3")


var headCount1 = document.getElementById("numOfHeads1");
var tailCount1 = document.getElementById("numOfTails1");

var headCount2 = document.getElementById("numOfHeads2");
var tailCount2 = document.getElementById("numOfTails2");

var headCount3 = document.getElementById("numOfHeads3");
var tailCount3 = document.getElementById("numOfTails3");


var binomialAns;
var poissonAns;

var result;


var temp = 1;
var lambda = 0;

const xValues1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const xValues2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const xValues3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const binomialData1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const binomialData2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const binomialData3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const poissonData1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const poissonData2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const poissonData3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
       
function binomialPMF(x, n, p) {
    return (factorial(n) / (factorial(x) * factorial(n - x))) * Math.pow(p, x) * Math.pow(1 - p, n - x);
}
function factorial(num) {
    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i;
    }
    return result;
}

function poissonPMF(x, lambda) {
    return (Math.pow(lambda, x) * Math.exp(-lambda)) / factorial(x);
}


const ctx = document.getElementById('linechart').getContext('2d');
const pmfChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xValues1,
        datasets: [
            {
                label: 'Binomial PMF n1, p1',
                data: binomialData1,
                borderColor: 'red',
                fill: false
            },
            {
                label: 'Binomial PMF n2, p2',
                data: binomialData2,
                borderColor: 'green',
                fill: false
            },
            {
                label: 'Binomial PMF n3, p3',
                data: binomialData3,
                borderColor: 'violet',
                fill: false
            },
            {
                label: 'Poisson distribution ',
                data: poissonData1,
                borderColor: 'black',
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Random Variable (x)'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'PMF'
                }
            }
        }
    }
});

function setPPoisson() {
    var prob1 = parseFloat(p1.value);
    var n1 = parseInt(n1Final.value);

    var prob2 = parseFloat(p2.value);
    var n2 = parseInt(n2Final.value);

    var prob3 = parseFloat(p3.value);
    var n3 = parseInt(n3Final.value);
    
    if (prob1 < 0 || prob1 > 1) {
        alert("Invalid p1 value");
        return;
    }
    
    if (prob2 < 0 || prob2 > 1) {
        alert("Invalid p2 value");
        return;
    }

    if (prob3 < 0 || prob3 > 1) {
        alert("Invalid p3 value");
        return;
    }

    if(n1 <= 10 || n1 > 50){
        alert("Range of n1 for the sake of the experiement is between 10 and 50");
        return;
    }

    if(n2 <= 50 || n2 > 100){
        alert("Range of n2 for the sake of the experiement is between 51 and 100");
        return;
    }
    
    if(n3 <=100  || n3 > 150){
        alert("Range of n3 for the sake of the experiement is between 101 and 150");
        return;
    }

    lambda = parseFloat(n1 * prob1).toFixed(1);

    var deltahigh = parseFloat(np.innerText) + 0.05;
    var deltalow = parseFloat(np.innerText) - 0.05;

    if(lambda < deltalow || lambda > deltahigh ){
        alert("pick n1and p1 values such that lambda = " + np.innerText);
        return;
    }

    lambda = parseFloat(n2 * prob2).toFixed(1);


    if(lambda < deltalow || lambda > deltahigh ){
        alert("pick n2 and p2 values such that lambda = " + np.innerText);
        return;
    }

    lambda = parseFloat(n3 * prob3).toFixed(1);


    if(lambda < deltalow || lambda > deltahigh ){
        alert("pick n3 and p3 values such that lambda = " + np.innerText);
        return;
    }

    fixedProbValue1.innerText = parseFloat(prob1).toFixed(5);
    fixedProbValue2.innerText =  parseFloat(prob2).toFixed(5);
    fixedProbValue3.innerText =  parseFloat(prob3).toFixed(5);

    fixednumofexp1.innerText = n1;
    fixednumofexp2.innerText = n2;
    fixednumofexp3.innerText = n3;

    document.getElementById("inputDiv").style.display = "none";
    document.getElementById("binomialDiv").style.display = "block";
}

function Poisson() {
    var exp, prob;

    if(temp == 1){
        exp = parseInt(fixednumofexp1.innerText);
        prob = parseFloat( fixedProbValue1.innerText);
        lambda = parseFloat(exp * prob).toFixed(1);

        for(var i = 0; i < exp; i++){
            var random = Math.random();
            result = (random < prob) ? 1 : 0;
            if(result == 1)
                headCount1.innerText = 1 + parseInt(headCount1.innerText);
            else
                tailCount1.innerText = 1 + parseInt(tailCount1.innerText);
        }

        poissonAns = parseFloat(poissonPMF(parseInt(headCount1.innerText), lambda)).toFixed(5);
        binomialAns = parseFloat(binomialPMF(parseInt(headCount1.innerText), exp, prob)).toFixed(5);

        
        var obs2 = "Exp 1: P<sub>Binomial</sub>(X = " + headCount1.innerText+") is: "+ binomialAns +", and P<sub>Poisson</sub>(X = "+ headCount1.innerText+") is: "+ poissonAns +". Difference: " +parseFloat(Math.abs(poissonAns - binomialAns)).toFixed(3)+". <br>";

        obs.innerHTML += obs2 ;


        
        var xDataNew = new Array();
        var yDataBinomial = new Array();
        var yDataPoisson = new Array();
        for(var i = 0; i <= exp; i++){
            var yBinomial =  parseFloat(binomialPMF(i, exp, prob)).toFixed(5);
            var yPoisson =  parseFloat(poissonPMF(i, lambda)).toFixed(5);
            if(yBinomial != 0){
                xDataNew.push(i);
                yDataBinomial.push(parseFloat(yBinomial));
                yDataPoisson.push(parseFloat(yPoisson));
            }
            else
                break;
        }
       
        pmfChart.data.datasets[0].data = yDataBinomial;
        pmfChart.data.datasets[3].data = yDataPoisson;      
    }
    else if( temp == 2){
        exp = parseInt(fixednumofexp2.innerText);
        prob = parseFloat( fixedProbValue2.innerText);
        lambda = parseFloat(exp * prob).toFixed(1);

        for(var i = 0; i < exp; i++){
            var random = Math.random();
            result = (random < prob) ? 1 : 0;
            if(result == 1)
                headCount2.innerText = 1 + parseInt(headCount2.innerText);
            else
                tailCount2.innerText = 1 + parseInt(tailCount2.innerText);
        }

        poissonAns = parseFloat(poissonPMF(parseInt(headCount2.innerText), lambda)).toFixed(5);
        binomialAns = parseFloat(binomialPMF(parseInt(headCount2.innerText), exp, prob)).toFixed(5);

        
        var obs2 = "Exp 2: P<sub>Binomial</sub>(X = " + headCount2.innerText+") is: "+ binomialAns +", and P<sub>Poisson</sub>(X = "+ headCount2.innerText+") is: "+ poissonAns +". Difference: " + parseFloat(Math.abs(poissonAns - binomialAns)).toFixed(3)+". <br>";

        obs.innerHTML += obs2 ;
        
        var xDataNew = new Array();
        var yDataBinomial = new Array();
        var yDataPoisson = new Array();
        for(var i = 0; i <= exp; i++){
            var yBinomial =  parseFloat(binomialPMF(i, exp, prob)).toFixed(5);
            if(yBinomial != 0){
                xDataNew.push(i);
                yDataBinomial.push(parseFloat(yBinomial));
            }
            else
                break;
        }

        pmfChart.data.datasets[1].data = yDataBinomial;
    }
    else if(temp = 3){
        exp = parseInt(fixednumofexp3.innerText);
        prob = parseFloat( fixedProbValue3.innerText);

        lambda = parseFloat(exp * prob).toFixed(1);
        for(var i = 0; i < exp; i++){
            var random = Math.random();
            result = (random < prob) ? 1 : 0;
            if(result == 1)
                headCount3.innerText = 1 + parseInt(headCount3.innerText);
            else
                tailCount3.innerText = 1 + parseInt(tailCount3.innerText);
        }
        poissonAns = parseFloat(poissonPMF(parseInt(headCount3.innerText), lambda)).toFixed(5);
        binomialAns = parseFloat(binomialPMF(parseInt(headCount3.innerText), exp, prob)).toFixed(5);

        
        var obs2 = "Exp 3: P<sub>Binomial</sub>(X = " + headCount3.innerText+") is: "+ binomialAns +", and P<sub>Poisson</sub>(X = "+ headCount3.innerText+") is: "+ poissonAns +". Difference: " + parseFloat(Math.abs(poissonAns - binomialAns)).toFixed(3)+". <br>";

        obs.innerHTML += obs2 ;
        
        var xDataNew = new Array();
        var yDataBinomial = new Array();
        var yDataPoisson = new Array();
        for(var i = 0; i <= exp; i++){
            var yBinomial =  parseFloat(binomialPMF(i, exp, prob)).toFixed(5);
            if(yBinomial != 0){
                xDataNew.push(i);
                yDataBinomial.push(parseFloat(yBinomial));
            }
            else
                break;
        }

        pmfChart.data.labels = xDataNew;
        pmfChart.data.datasets[2].data = yDataBinomial;
        pmfChart.update();
        document.getElementById("graphDiv").style.display="block";
    }
    else{
        alert("Experiment limit reached");
        return;
    }
    temp++;
}

function PoissonAll(){
    var remaining = 4-temp;

    if(remaining == 0){
        alert("Experiment limit reached");
        return;
    }
    for(var i = 0; i < remaining; i++)
        Poisson();
}

function reset() {
    p1.value = 0.5;
    n1Final.value = 40;
    
    p2.value = 0.5;
    n2Final.value = 80;
    
    p3.value = 0.5;
    n3Final.value = 120;
    
    var randomize = parseFloat(Math.random() * 10).toFixed(1);
    while(randomize < 1 ){
        randomize = parseFloat(Math.random() * 10).toFixed(1);
    }
    np.innerText = randomize;
    
    document.getElementById("inputDiv").style.display = "block";
    document.getElementById("binomialDiv").style.display = "none";
    document.getElementById("graphDiv").style.display="none";
    obs.innerText = "";
    
    headCount1.innerText = 0;
    tailCount1.innerText = 0;

    headCount2.innerText = 0;
    tailCount2.innerText = 0;

    headCount3.innerText = 0;
    tailCount3.innerText = 0;

    temp = 1;
}