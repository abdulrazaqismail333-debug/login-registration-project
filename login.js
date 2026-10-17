document.addEventListener("DOMContentLoaded", () => {
  // Get the HTML elements
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("toggle-password");
  const formMessage = document.getElementById("form-message");
  const loginButton = document.getElementById("login-button");
  const forgotPassword = document.getElementById("forgot-password");
  const signupLink = document.getElementById("signup-link");
  const rememberMe = document.getElementById("remember-me");

  // Show a message on the page
  function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
  }

  // Clear the message when the user edits a field
  function clearMessage() {
    formMessage.textContent = "";
    formMessage.className = "form-message";
  }

  emailInput.addEventListener("input", clearMessage);
  passwordInput.addEventListener("input", clearMessage);

  // Show or hide the password
  togglePassword.addEventListener("click", () => {
    const isPasswordHidden = passwordInput.type === "password";

    passwordInput.type = isPasswordHidden ? "text" : "password";
    togglePassword.textContent = isPasswordHidden ? "Hide" : "Show";
    togglePassword.setAttribute(
      "aria-label",
      isPasswordHidden ? "Hide password" : "Show password",
    );
    togglePassword.setAttribute("aria-pressed", String(isPasswordHidden));
  });

  // Validate the email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Handle form submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearMessage();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showMessage("Please enter your email and password.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", "error");
      emailInput.focus();
      return;
    }

    if (password.length < 6) {
      showMessage("Your password must contain at least 6 characters.", "error");
      passwordInput.focus();
      return;
    }

    // Demo only: this does not authenticate a real account.
    if (rememberMe.checked) {
      try {
        localStorage.setItem("login-email", email);
      } catch (error) {
        console.warn("Email preference could not be saved.");
      }
    } else {
      try {
        localStorage.removeItem("login-email");
      } catch (error) {
        console.warn("Email preference could not be removed.");
      }
    }

    showMessage(
      "Form validated successfully! Real account sign-in is not connected yet.",
      "success",
    );
  });

  // Restore the remembered email, if available
  try {
    const savedEmail = localStorage.getItem("login-email");

    if (savedEmail) {
      emailInput.value = savedEmail;
      rememberMe.checked = true;
    }
  } catch (error) {
    console.warn("Saved email could not be loaded.");
  }

  // Forgot password placeholder
  forgotPassword.addEventListener("click", (event) => {
    event.preventDefault();
    showMessage(
      "Password recovery will be available when we connect an account system.",
      "error",
    );
  });

  // Create account placeholder
  signupLink.addEventListener("click", (event) => {
    event.preventDefault();
    showMessage("The registration page has not been connected yet.", "error");
  });

  console.log("Login page JavaScript is working!");
});
