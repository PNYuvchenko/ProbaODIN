document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  if (localStorage.getItem("ege-theme") === "dark") document.body.classList.add("dark");
  if (toggle) toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("ege-theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
  const search = document.getElementById("taskSearch");
  if (search) search.addEventListener("input", () => {
    const q = search.value.toLowerCase().trim();
    document.querySelectorAll(".task-card").forEach(card => {
      card.style.display = (card.dataset.title + " " + card.dataset.topic).includes(q) ? "" : "none";
    });
  });
  const check = document.getElementById("checkAnswer");
  const show = document.getElementById("showAnswer");
  const solution = document.getElementById("solution");
  const input = document.getElementById("answerInput");
  const feedback = document.getElementById("feedback");
  if (show && solution) show.addEventListener("click", () => solution.classList.toggle("hidden"));
  if (check && input && feedback) check.addEventListener("click", () => {
    const expectedNode = document.getElementById("answer-data");
    const expected = expectedNode ? JSON.parse(expectedNode.textContent) : "";
    const clean = value => value.toLowerCase().trim().replace(/[.!?]/g, "").replace(/\s+/g, " ");
    if (!input.value.trim()) { feedback.textContent = "Сначала введи ответ."; feedback.className = "feedback bad"; return; }
    const ok = clean(input.value) === clean(String(expected));
    feedback.textContent = ok ? "Верно! Отличная работа." : "Пока неверно. Попробуй ещё раз или открой разбор.";
    feedback.className = "feedback " + (ok ? "good" : "bad");
    if (ok) { solution.classList.remove("hidden"); localStorage.setItem("ege-done-" + location.pathname, "1"); }
  });
});
