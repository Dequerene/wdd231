const courses = [
  { subject: "CSE", number: 110, title: "Introduction to Programming", credits: 2, completed: true },
  { subject: "WDD", number: 130, title: "Web Fundamentals", credits: 2, completed: true },
  { subject: "CSE", number: 111, title: "Programming with Functions", credits: 2, completed: true },
  { subject: "WDD", number: 131, title: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { subject: "CSE", number: 210, title: "Programming with Classes", credits: 2, completed: false },
  { subject: "WDD", number: 231, title: "Frontend Web Development I", credits: 2, completed: false }
];

const container = document.querySelector("#course-cards");
const creditTotalEl = document.querySelector("#total-credits");
const filterButtons = document.querySelectorAll(".filter-btn");

function renderCourses(list) {
  container.innerHTML = "";

  list.forEach(course => {
    const card = document.createElement("div");
    card.className = "course-card" + (course.completed ? " completed" : "");

    const title = document.createElement("span");
    title.className = "course-title";
    title.textContent = `${course.subject} ${course.number}`;

    const credits = document.createElement("span");
    credits.className = "course-credits";
    credits.textContent = `${course.credits} cr`;

    card.appendChild(title);
    card.appendChild(credits);

    container.appendChild(card);
  });

  const totalCredits = list.reduce((sum, c) => sum + c.credits, 0);
  creditTotalEl.textContent = totalCredits;
}

function setActiveButton(btn) {
  filterButtons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;

    let filteredCourses = courses;
    if (filter === "wdd") filteredCourses = courses.filter(c => c.subject === "WDD");
    if (filter === "cse") filteredCourses = courses.filter(c => c.subject === "CSE");

    setActiveButton(btn);
    renderCourses(filteredCourses);
  });
});

// initial load
renderCourses(courses);
