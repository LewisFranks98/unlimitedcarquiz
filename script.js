const questions = [
  {
    question: "Which car company produces the Mustang?",
    answers: ["Chevrolet", "Ford", "Dodge", "Pontiac"],
    correct: 1
  },
  {
    question: "Identify this car: [Image]",
    image: "car1.jpg", // Put image in folder and use <img> dynamically
    answers: ["Mazda RX-7", "Nissan 350Z", "Toyota Supra", "Mitsubishi Eclipse"],
    correct: 2
  }
];

let current = 0;

function loadQuestion() {
  const q = questions[current];
  const qDiv = document.getElementById('question');
  const aDiv = document.getElementById('answers');

  qDiv.innerHTML = q.image
    ? `<img src="${q.image}" alt="car" style="max-width:300px;"><p>${q.question}</p>`
    : q.question;

  aDiv.innerHTML = "";
  q.answers.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.innerText = answer;
    btn.onclick = () => checkAnswer(i);
    aDiv.appendChild(btn);
  });
}

function checkAnswer(choice) {
  const isCorrect = choice === questions[current].correct;
  alert(isCorrect ? "Correct!" : "Wrong!");
  document.getElementById("next").style.display = "block";
}

document.getElementById("next").onclick = () => {
  current++;
  if (current < questions.length) {
    loadQuestion();
    document.getElementById("next").style.display = "none";
  } else {
    alert("Quiz complete!");
  }
};

loadQuestion();
