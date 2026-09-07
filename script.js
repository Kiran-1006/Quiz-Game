const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setnextQuestion();
});

function startGame() {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setnextQuestion();
    quizScore = 0;
    document.getElementById('right-answers').innerText = quizScore;
}

function setnextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    if (!questionElement) return;
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    setStatusClass(document.body, correct);
    
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }

    if (selectedButton.dataset.correct === "true" || selectedButton.dataset.correct === true) {
        quizScore++;
    }
    document.getElementById('right-answers').innerText = quizScore;
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
const questions = [
    {
        question: 'Which one of these is a JavaScript framework?',
        answers :[
            {text: 'Python', correct: false},
            {text: 'Django', correct: false},
            {text: 'React', correct: true},
            {text: 'Java', correct: false}
        ],
    },
    {
        question: 'Which HTML element is used to embed JavaScript in an HTML document?',
        answers :[
            {text: '<javascript>', correct: false},
            {text: '<script>', correct: true},
            {text: '<head>', correct: false},
            {text: '<code>', correct: false}
        ],
    },
    {
        question: 'Which CSS property is used to create space inside an element, between its content and border?',
        answers :[
            {text: 'margin', correct: false},
            {text: 'border-spacing', correct: false},
            {text: 'border-radius', correct: false},
            {text: 'padding', correct: true}
        ],
    },
    {
        question: 'In Flexbox, which property is mainly used to align items along the main axis?',
        answers :[
            {text: 'align-items', correct: false},
            {text: 'justify-content',correct: true},
            {text: 'flex-direction', correct: false},
            {text: 'align-content', correct: false}
        ],
    },
    {
        question: 'What is the difference between == and === in JavaScript?',
        answers :[
            {text: '=== Checks value and type', correct: true},
            {text: '== Checks only type', correct: false},
            {text: '=== Is used for assignment', correct: false},
            {text: 'There is no difference', correct: false}
        ]
    }
]
