document.addEventListener("DOMContentLoaded", () => {
  // Get the form elements
  const registerForm = document.getElementById("register-form");
  const fullNameInput = document.getElementById("fullname");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const termsCheckbox = document.getElementById("terms");
  const formMessage = document.getElementById("form-message");

  // Display messages to the user
  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
  }

  // Clear messages when the user edits the form
  function clearMessage() {
    formMessage.textContent = "";
    formMessage.className = "form-message";
  }

  [
    fullNameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    termsCheckbox,
  ].forEach((element) => {
    element.addEventListener("input", clearMessage);
    element.addEventListener("change", clearMessage);
  });

  // Show or hide a password field
  function setupPasswordToggle(input, button) {
    button.addEventListener("click", () => {
      const isHidden = input.type === "password";

      input.type = isHidden ? "text" : "password";
      button.textContent = isHidden ? "Hide" : "Show";
      button.setAttribute(
        "aria-label",
        isHidden ? "Hide password" : "Show password",
      );
      button.setAttribute("aria-pressed", String(isHidden));
    });
  }

  setupPasswordToggle(
    passwordInput,
    document.getElementById("toggle-password"),
  );

  setupPasswordToggle(
    confirmPasswordInput,
    document.getElementById("toggle-confirm-password"),
  );

  // Check email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Validate the form when submitted
  registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage();

    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!fullName || !email || !password || !confirmPassword) {
      showMessage("Please fill in all the fields.", "error");
      return;
    }

    if (fullName.length < 2) {
      showMessage("Please enter your full name.", "error");
      fullNameInput.focus();
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    if (password.length < 8) {
      showMessage("Your password must contain at least 8 characters.", "error");
      passwordInput.focus();
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Your passwords do not match. Please try again.", "error");
      confirmPasswordInput.focus();
      return;
    }

    if (!termsCheckbox.checked) {
      showMessage(
        "Please agree to the Terms and Conditions to continue.",
        "error",
      );
      termsCheckbox.focus();
      return;
    }

    // Front-end demonstration only. No account is created.
    showMessage(
      "All checks passed! Your form is ready for real account registration.",
      "success",
    );

    console.log("Registration form validation passed.");
  });

  console.log("Registration page JavaScript is working!");
});
