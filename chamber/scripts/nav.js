const menuToggle = document.querySelector("#menuToggle");
const primaryNav = document.querySelector("#primaryNav");

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});
