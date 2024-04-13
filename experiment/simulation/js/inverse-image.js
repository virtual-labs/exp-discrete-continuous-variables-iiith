var W1 = document.getElementById("W1")
var W2 = document.getElementById("W2")
var W3 = document.getElementById("W3")
var W4 = document.getElementById("W4")
var obsText = document.getElementById("observationText1");
const chx1 = document.getElementById('myChart1');
var numericValue;

// Create a dummy graph to display
// Data for the chart
var data = {
  datasets: [{
    label: 'mapping of the sample space based on function f',
    data: [
      {
        x: 0,
        y: 'c'
      },
      {
        x: 0,
        y: 'f(w1)'
      },
      {
        x: 0,
        y: 'f(w2)'
      },
      {
        x: 0,
        y: 'f(w3)'
      },
      {
        x: 0,
        y: 'f(w4)'
      }
    ],
    backgroundColor: 'rgb(255, 99, 132)',
    pointRadius: 10 
  },
  {
    label: 'The inverse image of c based on the function f',
    data: [
      {
        x: -8,
        y: 'c'
      },
      {
        x: 0,
        y: 'c',
      }
    ],
    showLine: true,
    borderColor: 'rgba(0, 0, 0, 0)',
    backgroundColor: 'rgba(0, 255, 0, 0.25)',
    fill: true,
    tension: 0 
  }]
};
var config = {
  type: 'scatter',
  data: data,

  options: {
    scales: {
        x: {
            type: 'linear',
            position: 'bottom',
            min: Math.min(-8, 0),
            max: Math.max(8, 0),
            title: {
                display: true,
                text: 'Values of the mapping'
            }
        },
        y: {
            type: 'category',
            labels: ['c', 'f(w1)', 'f(w2)', 'f(w3)', 'f(w4)', ""],
            title: {
                display: true,
                text: 'Variables'
            }
        }
    }, 
  }
};
var chartUpdate = new Chart(chx1, config);
chx1.style.display="none";

// Form submit button functionality
document.getElementById('randomNumGeneratorButton').addEventListener('click', function() {
  resetValues();
  numericValue= parseFloat(document.getElementById('myNumberInput').value);
  document.getElementById("myForm").reset()
  W1.innerText =  (Math.random()*15 - 7.5).toFixed(2);
  W2.innerText =  (Math.random()*15 - 7.5).toFixed(2);
  W3.innerText =  (Math.random()*15 - 7.5).toFixed(2);
  W4.innerText =  (Math.random()*15 - 7.5).toFixed(2);
  obsText.innerText = "Values have been generated. \n They are: c = " + numericValue + ", f(w1) = " + parseFloat(W1.innerText) + ", f(w2) = " +  parseFloat(W2.innerText) + ", f(w3) = " +  parseFloat(W3.innerText) + ", f(w4) = " +  parseFloat(W4.innerText) + "." ;
});

// Checks to see if the input is correctly entered (Only numbers including decimals)
function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  // Allow minus sign (-) at the start (charCode 45)
  // Allow decimal point (.) (charCode 46)
  // Allow digit (0-9) (charCode 48-57)
  if (charCode > 31 && (charCode != 45 && charCode != 46 && (charCode < 48 || charCode > 57))) {
      return false;
  }
  // Additional logic to ensure only a single minus sign at the start
  const input = evt.target.value;
  // If the character is a minus, and it's not at the start or there's already one, prevent input
  if (charCode == 45 && (input.indexOf('-') !== -1 || input.length > 0)) {
      return false;
  }
  // Additional logic to ensure only a single decimal point
  if (charCode == 46 && input.indexOf('.') !== -1) {
      return false;
  }
  return true;
}

function verifyAns(val1, val2, val3, val4){
  // Getting the current values
  var w1 = parseFloat(W1.innerText)
  var w2 = parseFloat(W2.innerText)
  var w3 = parseFloat(W3.innerText)
  var w4 = parseFloat(W4.innerText)
  
  // Gettng the parameter values
  var argContainer = [];
  argContainer.push(parseInt(val1))
  argContainer.push(parseInt(val2))
  argContainer.push(parseInt(val3))
  argContainer.push(parseInt(val4))

  var str = "{"
  var flag = 0
  for(var i = 0; i < 4; i++)
    if(argContainer[i] == 1){
      str += "w" + parseInt(i+1) + ", "
      flag = 1;
    }
  
    str = str.substring(0, str.length-2)
  str+="}"
  
  if(flag === 0)
      str = "{ }"
      
  if(isNaN(w1)){
    obsText.innerText = "Option chosen was: "+ str+ ".\n Please generate the values before choosing the answer"
    chx1.style.display = "none"; // Hide the div
  }
  else{
    obsText.innerText = "";
    c = numericValue

    obsText.innerText = "Values are: c = " + numericValue + ", f(w1) = " + w1 + ", f(w2) = " + w2 + ", f(w3) = " + w3 + ", f(w4) = " + w4 + ". \n" ;
    var ansContainer = [0,0,0,0]
    if(w1 <= c)
      ansContainer[0] = 1
    else{
      obsText.innerText += " f(w1) > " + c + ' '
    }
    
    if(w2 <= c)
      ansContainer[1] = 1
    else{
      obsText.innerText += " f(w2) > " + c + ' '
    }
    
    if(w3 <= c)
      ansContainer[2] = 1
    else{
      obsText.innerText += " f(w3) > " + c + ' '
    }
    
    if(w4 <= c)
      ansContainer[3] = 1
    else
      obsText.innerText += " f(w4) > " + c + ' '
    flag = 0;
    
    for(let i = 0; i < 4; i++)
      if(argContainer[i] != ansContainer[i])
        flag = 1;
    
    if(flag == 1){
      obsText.innerText += " Option chosen was: "+ str +", which is the incorrect answer. :( Please try again!!"
      chx1.style.display = "none";
    }
    else{
      obsText.innerText += " Option chosen was: "+ str +", which is the correct answer. :) Please proceed ahead."
      chx1.style.display = "block";
      displayChart1(w1,w2,w3,w4,c)
    }
  }
}

function resetValues(){
  W1.innerText = ""
  W2.innerText = ""
  W3.innerText = ""
  W4.innerText = ""
  obsText.innerText = "Values have been Reset"
  chx1.style.display = "none"; // Hide the div
}

// Update the graph
function displayChart1(val1, val2, val3, val4, val5){  
  if(chartUpdate)
    chartUpdate.destroy();
  data = {
    datasets: [{
      label: 'mapping of the sample space based on function f',
      data: [
        {
          x: val5,
          y: 'c'
        },
        {
          x: val1,
          y: 'f(w1)'
        },
        {
          x: val2,
          y: 'f(w2)'
        },
        {
          x: val3,
          y: 'f(w3)'
        },
        {
          x: val4,
          y: 'f(w4)'
        }
      ],
      backgroundColor: 'rgb(255, 99, 132)',
      pointRadius: 5 
    },
    {
      label: 'The inverse image of c based on the function f',
      data: [
        {
          x: -8,
          y: 'c'
        },
        {
          x: val5,
          y: 'c',
        }
      ],
      showLine: true,
      borderColor: 'rgba(0, 0, 0, 0)',
      backgroundColor: 'rgba(0, 255, 0, 0.25)',
      fill: true,
      tension: 0 
    }]
  };
  config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          min: Math.min(-8, val5),
                max: Math.max(8, val5),
                title: {
                    display: true,
                    text: 'Values of the mapping'
                }
            },
            y: {
                type: 'category',
                labels: ['c', 'f(w1)', 'f(w2)', 'f(w3)', 'f(w4)', ""],
                title: {
                    display: true,
                    text: 'Variables'
                }
            }
        }, 
      }
    };
  chartUpdate = new Chart(chx1, config);
}