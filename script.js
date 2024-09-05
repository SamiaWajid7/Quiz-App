const quizData = [
  {
    question: "What is the capital city of Pakistan?",
    options: ["Lahore", "Islamabad", "Karachi", "Quetta"],
    answer: "Islamabad",
  },
  {
    question: "What is the national language of Pakistan?",
    options: ["Arabic", "Punjabi", "Urdu", "Pashto"],
    answer: "Urdu",
  },
  {
    question: 'Who is known as the "Father of the Nation" in Pakistan?',
    options: [
      "Allama Iqbal",
      "Liaquat Ali Khan",
      "Muhammad Ali Jinnah",
      "Sir Syed Ahmed Khan",
    ],
    answer: "Muhammad Ali Jinnah",
  },
  {
    question: "What is the national sport of Pakistan?",
    options: ["Cricket", "Hockey", "Football", "Squash"],
    answer: "Hockey",
  },
  {
    question: "What is the national flower of Pakistan?",
    options: ["Rose", "Jasmine", "Tulip", "Sunflower"],
    answer: "Jasmine",
  },
  {
    question: "What is the official currency of Pakistan?",
    options: ["Rupee", "Dinar", "Dollar", "Taka"],
    answer: "Rupee",
  },
  {
    question: "Which river is the longest in Pakistan?",
    options: ["Indus River", "Jhelum River", "Ravi River", "Chenab River"],
    answer: "Indus River",
  },
  {
    question: 'Which Pakistani city is known as the "City of Gardens"?',
    options: ["Karachi", "Peshawar", "Lahore", "Quetta"],
    answer: "Lahore",
  },
  {
    question: "Which mountain is the highest peak in Pakistan?",
    options: ["Nanga Parbat", "Rakaposhi", "Tirich Mir", "K2"],
    answer: "K2",
  },
  {
    question: "Which is the largest province of Pakistan by area?",
    options: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"],
    answer: "Balochistan",
  },
];

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton = document.getElementById("submit");
const retryButton = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");

// Variables to keep track of quiz state
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

// Function to shuffle the options for each question
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

    // Create and set up the question element
  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = questionData.question;

    // Create and set up the options element
  const optionsElement = document.createElement("div");
  optionsElement.className = "options";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

    // Create radio buttons for each option
  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement("label");
    option.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = "";
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

// Function to check the selected answer and update score
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (!selectedOption) {
    alert("Please select an option before submitting.");
    return;
  }
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    }
        // Record incorrect answers
    else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;

  // Display the next question or results    
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";

  showAnswerButton.style.display = "inline-block";

  // Provide feedback based on score
  let feedback;
  const percentage = (score / quizData.length) * 100;

  if (percentage >= 80) {
    feedback = "Excellent!";
  } else if (percentage >= 50) {
    feedback = "Good!";
  } else {
    feedback = "Try again!";
  }

  // Display the result and feedback
  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>${feedback}</p>
    `;

  resultContainer.classList.remove("hide");

  // Hide the showAnswerButton if all answers are correct
  if (score === quizData.length) {
    showAnswerButton.style.display = "none";
  }
}

function retryQuiz() {
  location.reload();
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = "block";
  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";
  resultContainer.style.display = "none";
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none"; 

  let incorrectAnswersHtml = "";
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

    // Display the incorrect answers
  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

// Event listeners for button actions
submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

// Initialize the first question
displayQuestion();
