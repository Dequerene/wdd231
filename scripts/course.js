const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces programming concepts and problem-solving techniques.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces HTML, CSS, responsive design, and web standards.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course focuses on writing programs using functions and good organization.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course teaches object-oriented programming using classes.',
    technology: ['C#'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces JavaScript, DOM manipulation, and dynamic web pages.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Web Frontend Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course teaches frontend development with responsive design and JavaScript.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

const courseList = document.querySelector('#course-list');
const totalCredits = document.querySelector('#total-credits');
const filterButtons = document.querySelectorAll('.filter');

function displayCourses(courseArray) {
  courseList.innerHTML = '';

  courseArray.forEach((course) => {
    const courseCard = document.createElement('button');

    courseCard.type = 'button';
    courseCard.className = course.completed ? 'course-card completed' : 'course-card';

    courseCard.innerHTML = `
      ${course.subject} ${course.number}
      <span>${course.completed ? 'Completed' : 'Not completed yet'}</span>
    `;

    courseCard.setAttribute(
      'aria-label',
      `${course.subject} ${course.number}: ${course.title}. ${course.completed ? 'Completed' : 'Not completed yet'}.`
    );

    courseList.appendChild(courseCard);
  });

  const credits = courseArray.reduce((total, course) => total + course.credits, 0);

  totalCredits.textContent = `The total credits for courses listed above is ${credits}`;
}

function setActiveButton(selectedButton) {
  filterButtons.forEach((button) => {
    button.classList.remove('active-filter');
    button.setAttribute('aria-pressed', 'false');
  });

  selectedButton.classList.add('active-filter');
  selectedButton.setAttribute('aria-pressed', 'true');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setActiveButton(button);

    const filter = button.dataset.filter;

    const filteredCourses = filter === 'all'
      ? courses
      : courses.filter((course) => course.subject === filter);

    displayCourses(filteredCourses);
  });
});

displayCourses(courses);