const questions = [
  {
    question: "Which car company produces the Mustang?",
    answers: ["Chevrolet", "Ford", "Dodge", "Pontiac"],
    correct: 1
  },
  {
    question: "Identify this car:",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/1993_Toyota_Supra_MK_IV_Turbo_front-left_2009-03-08_A.jpg/640px-1993_Toyota_Supra_MK_IV_Turbo_front-left_2009-03-08_A.jpg",
    answers: ["Mazda RX-7", "Nissan 350Z", "Toyota Supra", "Mitsubishi Eclipse"],
    correct: 2
  }
];

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
    // Optionally reset:
    // current = 0;
    // loadQuestion();
  }
};

loadQuestion();
