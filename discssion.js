let questions = JSON.parse(localStorage.getItem("questions")) || [];

const searchBox = document.getElementById("search");
const questionList = document.getElementById("question-list");
const rightPane = document.getElementById("right-pane");
const newQuestionBtn = document.getElementById("new-question-btn");
const SubmitBtn = document.getElementById("submit-new-question");

function saveQuestions() {
  localStorage.setItem("questions", JSON.stringify(questions));
}

function renderQuestions(filtered = null) {
  questionList.innerHTML = "";
  const list = filtered || questions;

  if (list.length == 0) {
    questionList.innerHTML = "<p style='color: gray;'>No questions yet.</p>";
    return;
  }

  list.forEach(q => {
    const item = document.createElement("div");
    item.classList.add("question-item");
    item.setAttribute("data-qid", q.qid);
    item.innerHTML = `<b>${q.subject}</b><br>${q.question}`;
    item.addEventListener("click", () => openQuestion(q.qid));
    questionList.appendChild(item);
  });
}

function openQuestion(qid) {
  const q = questions.find(q => q.qid === qid);
  if (!q) 
    return;

  rightPane.innerHTML = `
    <h2>${q.subject}</h2>
    <p>${q.question}</p>
    <button id="delete-btn" style="background: red; color: white; margin-bottom: 10px;">Delete</button>
    <h3>Responses</h3>
    <div id="answers-section">
      ${q.answers.map((a, index) => `
        <div class="response" data-index="${index}">
          <p><strong>${a.name}</strong>: ${a.comment}</p>
          <button class="like-btn" data-qid="${q.qid}" data-index="${index}">Like ${a.likes}</button>
          <button class="dislike-btn" data-qid="${q.qid}" data-index="${index}">Dislike ${a.dislikes}</button>
        </div>
      `).join("")}
    </div>
    <h3>Add a Response</h3>
    <input type="text" id="name" placeholder="Your Name" />
    <textarea id="comment" placeholder="Your Comment"></textarea>
    <button id="submit-response">Submit Response</button>
  `;

  document.getElementById("delete-btn").addEventListener("click", () => deleteQuestion(q.qid));
  document.getElementById("submit-response").addEventListener("click", () => submitResponse(q.qid));

  document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", () => {
      const qid = button.getAttribute("data-qid");
      const index = parseInt(button.getAttribute("data-index"));
      like(qid, index);
    });
  });

  document.querySelectorAll(".dislike-btn").forEach(button => {
    button.addEventListener("click", () => {
      const qid = button.getAttribute("data-qid");
      const index = parseInt(button.getAttribute("data-index"));
      dislike(qid, index);
    });
  });
}

function like(qid, index) {
  const q = questions.find(q => q.qid == qid);
  if (q) {
    q.answers[index].likes += 1;
    saveQuestions();
    openQuestion(qid);
  }
}

function dislike(qid, index) {
  const q = questions.find(q => q.qid == qid);
  if (q) {
    q.answers[index].dislikes += 1;
    saveQuestions();
    openQuestion(qid);
  }
}

function submitResponse(qid) {
  const name = document.getElementById("name").value.trim();
  const comment = document.getElementById("comment").value.trim();

  if (!name || !comment) {
    alert("Fill in all fields");
    return;
  }

  const q = questions.find(q => q.qid == qid);
  if (!q) 
    return;

  q.answers.push({ name, comment, likes: 0, dislikes: 0 });
  saveQuestions();
  openQuestion(qid);
}

function deleteQuestion(qid) {
  if (confirm("Are you sure you want to delete this question?")) {
    questions = questions.filter(q => q.qid !=  qid);
    saveQuestions(); 
    renderQuestions();
    resetForm();
  }
}

function resetForm() {
  rightPane.innerHTML = `
    <h2>Add a New Question</h2>
    <input type="text" id="sub1" placeholder="Subject" />
    <textarea id="question" placeholder="Your question here..." rows="4"></textarea>
    <button id="submit-new-question" class="btn">Submit</button>
  `;
  document.getElementById("submit-new-question").addEventListener("click", submitNewQuestion);
}

function showQuestionForm() {
  resetForm();
}

function submitNewQuestion() {
  const subject = document.getElementById("sub1").value.trim();
  const questionText = document.getElementById("question").value.trim();

  if (!subject || !questionText) {
    alert("Fill all fields");
    return;
  }

  const qid = Date.now().toString();
  questions.push({ subject, question: questionText, answers: [], qid });
  saveQuestions();
  renderQuestions();
  resetForm();
}

if (newQuestionBtn) {
  newQuestionBtn.addEventListener("click", showQuestionForm);
}

if (SubmitBtn) {
  SubmitBtn.addEventListener("click", submitNewQuestion);
}

searchBox.addEventListener("input", function () {
  const searchText = this.value.trim().toLowerCase();
  const filtered = questions.filter(q =>
    q.subject.toLowerCase().includes(searchText) ||
    q.question.toLowerCase().includes(searchText)
  );
  renderQuestions(filtered);
});

renderQuestions();
