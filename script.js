// QUIZ QUESTIONS ARRAY (State)
const quizQuestions = [
    {
        question: "In web design, what does CSS stand for?",
        options: [
            "Counter Strike: Source",
            "Corrective Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet"
        ],
        answer: 3
    },
    {
        question: "Which DOM method selects an HTML element by its unique ID?",
        options: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.getElementsByClass()",
            "document.createNode()"
        ],
        answer: 1
    },
    {
        question: "Which HTML attribute triggers a JavaScript function when a button is clicked?",
        options: [
            "onhover",
            "onchange",
            "onclick",
            "onload"
        ],
        answer: 2
    },
    {
        question: "Which CSS property is used to create a flexible row or column layout?",
        options: [
            "display: flex",
            "position: fixed",
            "float: center",
            "text-align: block"
        ],
        answer: 0
    },
    {
        question: "What does DOM stand for in JavaScript web development?",
        options: [
            "Data Object Management",
            "Document Object Model",
            "Dynamic Output Module",
            "Digital Order Method"
        ],
        answer: 1
    }
];

let currentIndex = 0;
let score = 0;
let answered = false;

const letters = ["A", "B", "C", "D"];

// Render the current question and options onto the page
function loadQuestion() {
    answered = false;
    const currentQ = quizQuestions[currentIndex];

    document.getElementById("questionCounter").textContent =
        "Question " + (currentIndex + 1) + "/" + quizQuestions.length;

    const progressPercent = ((currentIndex + 1) / quizQuestions.length) * 100;
    document.getElementById("progressFill").style.width = progressPercent + "%";

    document.getElementById("questionText").textContent = currentQ.question;
    document.getElementById("feedbackText").textContent = "";

    const optionsList = document.getElementById("optionsList");
    optionsList.innerHTML = "";

    currentQ.options.forEach(function (optionText, index) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "option-btn";

        const badge = document.createElement("span");
        badge.className = "option-letter";
        badge.textContent = letters[index];

        const label = document.createElement("span");
        label.className = "option-text";
        label.textContent = optionText;

        btn.appendChild(badge);
        btn.appendChild(label);

        btn.onclick = function () {
            selectOption(index, btn);
        };

        optionsList.appendChild(btn);
    });
}

// Handle option click event
function selectOption(selectedIndex, clickedBtn) {
    if (answered) return;
    answered = true;

    const correctIndex = quizQuestions[currentIndex].answer;
    const allButtons = document.querySelectorAll(".option-btn");
    const feedback = document.getElementById("feedbackText");

    if (selectedIndex === correctIndex) {
        clickedBtn.classList.add("correct");
        score++;
        document.getElementById("scoreDisplay").textContent = score;
        feedback.style.color = "#28a745";
        feedback.textContent = "Correct Answer!";
    } else {
        clickedBtn.classList.add("wrong");
        allButtons[correctIndex].classList.add("correct");
        feedback.style.color = "#c0392b";
        feedback.textContent = "Wrong! Correct option is " + letters[correctIndex] + ".";
    }

    allButtons.forEach(function (btn) {
        btn.disabled = true;
    });
}

// Triggered by the Next button (onclick="nextQuestion()")
function nextQuestion() {
    if (!answered) {
        alert("Please select an option before moving to the next question!");
        return;
    }

    currentIndex++;

    if (currentIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showFinalScore();
    }
}

// Display final score and Restart option
function showFinalScore() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = "";

    const box = document.createElement("div");
    box.className = "result-box";

    const heading = document.createElement("h2");
    heading.textContent = "Quiz Completed!";

    const summary = document.createElement("p");
    summary.textContent = "Your Final Score: " + score + " out of " + quizQuestions.length;

    const restartBtn = document.createElement("button");
    restartBtn.type = "button";
    restartBtn.className = "btn-next";
    restartBtn.textContent = "Restart Quiz";
    restartBtn.onclick = function () {
        location.reload();
    };

    box.appendChild(heading);
    box.appendChild(summary);
    box.appendChild(restartBtn);
    container.appendChild(box);
}

// Initialize first question on page load
loadQuestion();