const questions = [
  {
    question: "Identify this car:",
    image: "https://cdn.pixabay.com/photo/2021/01/04/07/58/jdm-5886801_1280.jpg",
    answers: ["Mazda RX-7", "Nissan 350Z", "Toyota Supra", "Mitsubishi Eclipse"],
    correct: 2
  },
    {
    question: "Identify this car:",
    image: "https://cdn.pixabay.com/photo/2018/07/18/17/27/nissan-3546822_1280.jpg",
    answers: ["Mazda RX-7", "Nissan Skyline R33", "Toyota Supra", "Mitsubishi Eclipse"],
    correct: 1
  }
];

// Shuffle function (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function shuffleAnswers(question) {
  const originalCorrectIndex = question.correct;
  const answerObjects = question.answers.map((answer, index) => ({
    answer,
    originalIndex: index
  }));

  // Shuffle answers
  for (let i = answerObjects.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answerObjects[i], answerObjects[j]] = [answerObjects[j], answerObjects[i]];
  }

  question.answers = answerObjects.map(obj => obj.answer);
  question.correct = answerObjects.findIndex(obj => obj.originalIndex === originalCorrectIndex);
}

// Shuffle questions and their answers before starting
shuffle(questions);
questions.forEach(q => shuffleAnswers(q));

let current = 0;
let attempts = 0;
const maxTries = 5;

function loadQuestion() {
  const q = questions[current];
  const qDiv = document.getElementById('question');
  const dropdown = document.getElementById('dropdown');
  const submitBtn = document.getElementById('submit');
  const nextBtn = document.getElementById('next');

  attempts = 0;
  submitBtn.disabled = false;
  nextBtn.style.display = "none";

  qDiv.innerHTML = q.image
    ? `<img src="${q.image}" alt="car" style="max-width:300px;"><p>${q.question}</p>`
    : `<p>${q.question}</p>`;

  dropdown.innerHTML = `<option disabled selected value="">Select an answer</option>`;
  q.answers.forEach((answer, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.innerText = answer;
    dropdown.appendChild(opt);
  });
}

function checkAnswer() {
  const dropdown = document.getElementById('dropdown');
  const choice = parseInt(dropdown.value);
  const correct = questions[current].correct;

  if (isNaN(choice)) {
    alert("Please select an answer first.");
    return;
  }

  attempts++;

  if (choice === correct) {
    alert("Correct!");
    document.getElementById("submit").disabled = true;
    document.getElementById("next").style.display = "block";
  } else if (attempts >= maxTries) {
    alert(`Out of tries! The correct answer was: ${questions[current].answers[correct]}`);
    document.getElementById("submit").disabled = true;
    document.getElementById("next").style.display = "block";
  } else {
    alert(`Wrong! Tries left: ${maxTries - attempts}`);
  }
}

document.getElementById("submit").onclick = checkAnswer;

document.getElementById("next").onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    alert("Quiz complete!");
  }
};

loadQuestion();
