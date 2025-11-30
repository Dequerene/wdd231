document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const firstName = params.get("firstName") || "—";
  const lastName = params.get("lastName") || "—";
  const email = params.get("email") || "—";
  const phone = params.get("phone") || "—";
  const organization = params.get("organization") || "—";
  const timestamp = params.get("timestamp") || "—";

  document.querySelector("#summary-firstName").textContent = firstName;
  document.querySelector("#summary-lastName").textContent = lastName;
  document.querySelector("#summary-email").textContent = email;
  document.querySelector("#summary-phone").textContent = phone;
  document.querySelector("#summary-organization").textContent = organization;
  document.querySelector("#summary-timestamp").textContent = timestamp;
});
