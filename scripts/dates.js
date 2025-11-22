// Current year
document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Last modified
document.querySelector("#lastModified").textContent =
  `Last Modification: ${document.lastModified}`;
