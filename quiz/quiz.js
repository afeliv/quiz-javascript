const questions = [
    {
        question: 'Normalmente, quantos litros de sangue uma pessoa tem?',

        answers: [
            {
                id: 1 , text: 'Tem entre 2 a 4 litros.', correct:false
            },

            {
                id: 2 , text: 'Tem 7 litros.', correct:false
            },

            {
                id: 3 , text: 'Entre 4 a 6 litros.', correct:true
            },

            {
                id: 4 , text: 'Tem 0,5 litros.', correct:false
            },
        ]
    },

    {
        question: 'De quem é a invenção do chuveiro elétrico?',

        answers: [
            {
                id: 1 , text: 'França', correct:false
            },

            {
                id: 2 , text: 'Inglaterra', correct:false
            },

            {
                id: 3 , text: 'Itália', correct:false
            },

            {
                id: 4 , text: 'Brasil', correct:true
            },
        ]
    },

    {
        question: 'Quantas casas decimas tem o número pi?',

        answers: [
            {
                id: 1 , text: 'Duas', correct:false
            },

            {
                id: 2 , text: 'Centenas', correct:false
            },

            {
                id: 3 , text: 'Infinitas', correct:true
            },

            {
                id: 4 , text: 'Vinte', correct:false
            },
        ]
    },

    {
        question: 'O que a palavra legend siginifica em português?',

        answers: [
            {
                id: 1 , text: 'Lenda', correct:true
            },

            {
                id: 2 , text: 'Legendário', correct:false
            },

            {
                id: 3 , text: 'Conto', correct:true
            },

            {
                id: 4 , text: 'Legenda', correct:false
            },
        ]
    },
]

const questionElement = document.getElementById('questoes');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = 'Próximo';
   showQuestion();
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion(){
   resetState(); 
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;
    
    //answers
    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add('btn');
        button.addEventListener('click' , selectAnswer);
        answerButtons.appendChild(button);
    });

}

function selectAnswer(e) {
   answers = questions[currentQuestionIndex].answers; 
   const correctAnswer = answers.filter((answer) => answer.correct === true)[0];

   const selectedBtn = e.target;
   const isCorrect = selectedBtn.dataset.id == correctAnswer.id;
   if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
   } else {
        selectedBtn.classList.add('incorrect');
   }
   Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true; 
   });
   nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
    nextButton.innerHTML = 'Jogar novamente';
    nextButton.style.display = 'block'
}
function handleNextButton() {
   currentQuestionIndex++;
   if(currentQuestionIndex < questions.length) {
    showQuestion();
   } else {
    showScore();
   }
}

nextButton.addEventListener('click',() => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();
