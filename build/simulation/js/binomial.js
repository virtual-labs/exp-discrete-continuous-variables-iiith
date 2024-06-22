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

var p = document.getElementById("inputProbability");
var result;
var randomVariableAns;

var coinFlips = document.getElementById("numOfCoinFlips");
var expResult = document.getElementById("binomialResult");
var obs = document.getElementById("observations")
var fixedProbValue = document.getElementById("probabilityValue");
var headCount = document.getElementById("numOfHeads");
var tailCount = document.getElementById("numOfTails");

var nFinal = 10;

function setPBinomial() {
    var prob = parseFloat(p.value);
    if (prob < 0 || prob > 1) {
        alert("Invalid P(H) value");
        return;
    }
    document.getElementById("inputDiv").style.display = "none";
    document.getElementById("binomialDiv").style.display = "block";    
    fixedProbValue.innerHTML = prob;
}

function binomial() {
    var random = Math.random();
    var prob = parseFloat(fixedProbValue.innerText);
    result = (random < prob) ? 1 : 0;
    document.getElementById("binomialResult").innerHTML  = "current: <b>"+(result==0?"Tail":"Head")+"</b>";
    if( parseInt(coinFlips.innerText) < nFinal){
        coinFlips.innerText =  1 + parseInt(coinFlips.innerText);
        var prevresult = "res"+parseInt(coinFlips.innerText);
        if(result == 1){
            document.getElementById(prevresult).innerText = "H"
            headCount.innerText = 1 + parseInt(headCount.innerText);
        }
            
        else{
            tailCount.innerText = 1 + parseInt(tailCount.innerText);
            document.getElementById(prevresult).innerText = "T"
        }
            
        
        if(parseInt(coinFlips.innerText) === nFinal){
            randomVariableAns = parseFloat(binomialCoefficient(parseInt(coinFlips.innerText), parseInt(headCount.innerText)) * Math.pow(prob,  parseInt(headCount.innerText)) * Math.pow(1-prob,  parseInt(tailCount.innerText))).toFixed(2) ;
            showObservations()
        }
    }
}

function binomial10(){
    var remaining = nFinal - parseInt(coinFlips.innerText)
    for(var i = 0; i < remaining; i++)
            binomial();
}


function showObservations() {
    var observation = "<br> Our random variable X counts the number of heads: <b> " + parseInt(headCount.innerText) + "</b> , from 10 experiments. <br> According to the Binomial probability distribution, P( X = " + headCount.innerText+ " ) is : "+ randomVariableAns + "<br> From the experiment conducted by the  user the probability of heads occuring so far has been: " + parseFloat(parseInt(headCount.innerText) /parseInt(coinFlips.innerText) ).toFixed(2) + "<br> The expected number of heads is 'np', which is equal to: " + parseFloat( nFinal * parseFloat(fixedProbValue.innerText)).toFixed(2);
    obs.innerHTML = observation 
}

function reset() {
    p.value = 0.5;
    document.getElementById("inputDiv").style.display = "block";
    document.getElementById("binomialDiv").style.display = "none";
    obs.innerText = "";
    expResult.innerText = "current: ";
    coinFlips.innerText = 0;
    headCount.innerText = 0;
    tailCount.innerText = 0;

    var value="res";
    for(var i = 1;i <=10; i++)
        document.getElementById(value+i).innerText = "-";
}
