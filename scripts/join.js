document.addEventListener("DOMContentLoaded", () => {
  setTimestamp();
  setupModals();
  animateMembershipCards();
});

// 🔹 Preenche o campo hidden com a data/hora em que o form foi carregado
function setTimestamp() {
  const tsInput = document.querySelector("#timestamp");
  if (!tsInput) return;

  const now = new Date();
  // ISO é claro e fácil de usar na thankyou
  tsInput.value = now.toISOString();
}

// 🔹 Configura abertura/fechamento dos modais
function setupModals() {
  const benefitButtons = document.querySelectorAll(".benefits-btn");
  const closeButtons = document.querySelectorAll(".membership-modal .close-modal");

  benefitButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-modal");
      const modal = document.querySelector(`#${modalId}`);
      if (modal && typeof modal.showModal === "function") {
        modal.showModal();
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      if (dialog) dialog.close();
    });
  });
}

// 🔹 Animação inicial: cada card entra com um pequeno delay
function animateMembershipCards() {
  const cards = document.querySelectorAll(".membership-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.12}s`;
  });
}
