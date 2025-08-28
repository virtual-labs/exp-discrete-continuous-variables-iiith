var ansText = document.getElementById('AnswerChoiceText');
var obsText = document.getElementById('obsBody');
var defaultchoice = 0;

// Correct answers for each graph: [graphId, correct_violation_or_4_for_valid]
const correctAnswers = {
    1: 3, // Violates Right-continuous
    2: 2, // Violates Non-decreasing
    3: 4, // Satisfies all properties
    4: 4  // Satisfies all properties
};

const explanations = {
    1: {
        3: "<b>Correct!</b> This graph violates the right-continuity property. For a discrete RV, the value at a jump should be the upper value. Here, the open circles indicate it's not continuous from the right.",
        default: "<b>Incorrect.</b> This graph is non-decreasing and its limits are correct, but it fails the right-continuity test at each integer step."
    },
    2: {
        2: "<b>Correct!</b> This graph violates the non-decreasing property. A CDF can never decrease. Notice the value drops after x=3, which is not allowed.",
        default: "<b>Incorrect.</b> While the limits and continuity are fine for a discrete CDF, the function clearly decreases at one point, which is the primary violation."
    },
    3: {
        4: "<b>Correct!</b> This graph represents a valid CDF for a mixed random variable. It is non-decreasing, right-continuous, and its limits are 0 and 1.",
        default: "<b>Incorrect.</b> This graph satisfies all three properties of a valid CDF. It is non-decreasing, right-continuous everywhere, and approaches 0 and 1 at the limits."
    },
    4: {
        4: "<b>Correct!</b> This graph of a Normal CDF satisfies all properties. It is non-decreasing, continuous (and thus right-continuous), and approaches 0 at -∞ and 1 at +∞.",
        default: "<b>Incorrect.</b> This is a classic example of a valid CDF and satisfies all required properties."
    }
};

function sendresponse(i) {
    // Update UI to show selection
    ansText.innerText = "Graph " + i + " is selected. Which property does it violate (or is it valid)?";
    obsText.innerHTML = "Select an option from the list above.";
    defaultchoice = i;

    // Highlight selected graph
    for (let k = 1; k <= 4; k++) {
        document.getElementById('graph' + k).classList.remove('selected');
    }
    document.getElementById('graph' + i).classList.add('selected');
}

function checkanswer(j) {
    if (defaultchoice === 0) {
        obsText.innerHTML = "Please select a graph first before choosing an answer.";
        return;
    }

    const correctAnswer = correctAnswers[defaultchoice];
    const explanation = explanations[defaultchoice];

    if (j === correctAnswer) {
        obsText.innerHTML = `<span style="color:green;">${explanation[j]}</span>`;
    } else {
        obsText.innerHTML = `<span style="color:red;">${explanation.default}</span>`;
    }
}