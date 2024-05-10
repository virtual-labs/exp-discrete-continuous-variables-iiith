var ansText = document.getElementById('AnswerChoiceText')
var obsText = document.getElementById('obsBody')
var defaultchoice = 0;
function sendresponse(i){
    ansText.innerText = "Graph chosen is: " + i + ". Please select the appropriate options below which accurately represent the graph";
    obsText.innerText = "Graph chosen is: " + i + ".";
    defaultchoice = i;
}

function checkanswer(j){
    if(defaultchoice === 0)
    obsText.innerText = "Option chosen was :" + j +", please select a graph and try again";
    if(defaultchoice === 4){
        if(j === 4)
            obsText.innerText = "Graph chosen is: " + defaultchoice + ", and it satisfies all the 3 properties. The chosen ansswer is CORRECT";
        else
            obsText.innerText = "Graph chosen is: " + defaultchoice + ", and the answer chosen is incorrect";
    }
    if(defaultchoice === 3){
        if(j === 2)
            obsText.innerText = "Graph chosen is: " + defaultchoice + ", and it does not satisfy property number 2. The chosen ansswer is CORRECT";
        else
            obsText.innerText = "Graph chosen is: " + defaultchoice + ", and the answer chosen is incorrect as the graph satisfies the chosen property";
    }
    if(defaultchoice === 2){
        if(j === 1)
            obsText.innerText = "Graph chosen is: " + defaultchoice + ", and it does not satisfy property number 1. The chosen ansswer is CORRECT";
        else
            obsText.innerText = "Graph chosen is: " + defaultchoicei + ", and the answer chosen is incorrect as the graph satisfies the chosen property";
    }
    if(defaultchoice === 1){
        if(j === 3)
            obsText.innerText = "Graph chosen is: " + defaultchoice + ", and it does not satisfy property number 3. The chosen ansswer is CORRECT";
        else
            obsText.innerText = "Graph chosen is: " + defaultchoice + ", and the answer chosen is incorrect as the graph satisfies the chosen property";
    }      
        
}   