// footer.js
// Atualiza automaticamente o ano do copyright
// e a data da última modificação da página

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.querySelector("#currentYear");
  const lastModifiedSpan = document.querySelector("#lastModified");

  if (yearSpan) {
    const now = new Date();
    yearSpan.textContent = now.getFullYear();
  }

  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }
});
