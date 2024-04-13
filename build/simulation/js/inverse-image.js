const chx1 = document.getElementById('mychart1');
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

const ctx = document.getElementById('mychart2');
// Example data: probabilities at various points
const points = [1, 2, 3, 4];
const probabilities = [0.3, 0.6, 1.0, 1.0]; // Cumulative probabilities
const data2 = {
  labels: points,
  datasets: [{
    label: 'CMF',
    data: probabilities,
    borderColor: 'rgb(75, 192, 192)',
    fill: false,
    stepped: true,
  }]
};
const config2 = {
  type: 'line',
  data: data2,
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 1, // Since it's a probability, the maximum is 1
        ticks: {
          stepSize: 0.1 // Adjust based on your data granularity
        }
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Cumulative Mass Function (CMF) of a Random Variable'
      },
      legend: {
        display: true
      }
    }
  }
};
var chartUpdate2 = new Chart(ctx, config2);


const ctx3 = document.getElementById('mychart3');

// Function to calculate the CDF of the normal distribution
function normalCDF(mean, sigma, x) {
    return (0.5 * (1 + Math.erf((x - mean) / (Math.sqrt(2) * sigma))));
}

// Generate data points for the CDF
const mean = 0;
const sigma = 1;
const xValues = [-0.25, 0.75, 1.2, 3];
const cdfValues =[0,0,0,0]

function cdfvalues(){
  console.log('ddd')
  for(var i = 0; i < xValues.length; i++){
    console.log(xValues[i])
    console.log(normalCDF(mean, sigma, xValues[i]))
    cdfValues[i]= normalCDF(mean, sigma, xValues[i]);
  }
  return cdfValues
}

const data3 = {
    labels: xValues,
    datasets: [{
        label: 'Normal Distribution CDF',
        data: cdfvalues(),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
    }]
};

const config3 = {
    type: 'line',
    data: data3,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 1,
            }
        },
        plugins: {
            title: {
                display: true,
                text: 'Cumulative Distribution Function (CDF) of a Normal Distribution'
            },
            legend: {
                display: true
            }
        }
    }
};

var chartUpdate3 = new Chart(ctx3, config3);