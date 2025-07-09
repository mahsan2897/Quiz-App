const nextBtn = document.getElementById('nextBtn');
    const questionBox = document.getElementById('questionBox');
    const quizContainer = document.getElementById('quizContainer');

    let currentQuestion = 0;
    let userAnswer = '';
    let score = 0;
    let questions = [];

    // Load questions from API
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(data => {
        questions = data;
        showQuestion();
      })
      .catch(err => {
        questionBox.innerHTML = "<p class='text-danger'>Failed to load questions.</p>";
      });

    // Show current question
    function showQuestion() {
      const q = questions[currentQuestion];
      const allAnswers = [...q.incorrectAnswers];
      const correctIndex = Math.floor(Math.random() * (allAnswers.length + 1));
      allAnswers.splice(correctIndex, 0, q.correctAnswer);

      // Display question
      questionBox.innerHTML = `<p class="fw-bold">${q.question.text}</p>`;
      allAnswers.forEach((answer, index) => {
        questionBox.innerHTML += `
          <div>
            <input type="radio" name="answer" value="${answer}" id="ans${index}" onchange="selectAnswer('${answer}')">
            <label for="ans${index}">${answer}</label>
          </div>
        `;
      });
    }

    // Called when user selects an answer
    function selectAnswer(answer) {
      userAnswer = answer;
      nextBtn.disabled = false;
    }

    // Go to next question
    nextBtn.addEventListener('click', () => {
      if (userAnswer === questions[currentQuestion].correctAnswer) {
        score++;
      }

      currentQuestion++;
      userAnswer = '';
      nextBtn.disabled = true;

      if (currentQuestion < 10) {
        showQuestion();
      } else {
        showResult();
      }
    });

    // Show final score
    function showResult() {
      const gifUrl = score > 7
      quizContainer.innerHTML = `
        <div class="card mx-auto border-0" style="width: 18rem;">
          <div class="card-body text-center">
            <h5 class="card-title">Your Score</h5>
            <p class="card-text">${score} out of 10</p>
            <button class="btn btn-primary" onclick="location.reload()">Try Again</button>
          </div>
        </div>
      `;
    }