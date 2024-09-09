document.addEventListener("DOMContentLoaded", function() {
    // Clear local storage to ensure fresh start for returning users
    localStorage.clear();
    sessionStorage.clear();
    
    resetToFirstQuestion();
});

function selectOption(questionNumber, optionValue) {
    localStorage.setItem(`answer${questionNumber}`, optionValue);

    const nextQuestionId = questionNumber + 1;
    const nextQuestionElement = document.getElementById(`question-${nextQuestionId}`);

    if (nextQuestionElement) {
        document.getElementById(`question-${questionNumber}`).style.display = "none";
        nextQuestionElement.style.display = "block";
        localStorage.setItem("currentQuestion", nextQuestionId);
    } else {
        showSummaryScreen();
    }
}

function showSummaryScreen() {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("summary-screen").style.display = "block";

    const summaryElement = document.getElementById("summary");
    summaryElement.innerHTML = "";

    for (let i = 1; i <= 3; i++) {
        const questionText = document.querySelector(`#question-${i} h2`).innerText;
        const questionContent = document.querySelector(`#question-${i} p`).innerText;
        const userAnswer = localStorage.getItem(`answer${i}`);
        const userAnswerText = document.querySelector(`#question-${i} button[onclick="selectOption(${i}, '${userAnswer}')"]`).innerText;

        let result = `<strong>${questionText}</strong> - ${questionContent}<br>`;
        result += `Your answer: ${userAnswerText}<br>`;
        summaryElement.innerHTML += `<p>${result}</p>`;
    }
}

function resetToFirstQuestion() {
    document.getElementById("question-1").style.display = "block";
    document.getElementById("question-2").style.display = "none";
    document.getElementById("question-3").style.display = "none";
    document.getElementById("summary-screen").style.display = "none";
    document.getElementById("title-screen").style.display = "none";
}

function resetQuestions() {
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
}

function submitQuiz() {
    alert("Your answers have been submitted!");
    document.getElementById("summary-screen").style.display = "none";
    document.getElementById("title-screen").style.display = "block";
}
