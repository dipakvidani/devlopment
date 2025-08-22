document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (user) {
    // Fill all fields, only if element exists
    const firstNameInput = document.getElementById("first_name");
    if (firstNameInput) firstNameInput.value = user.firstName || "";

    const lastNameInput = document.getElementById("last_name");
    if (lastNameInput) lastNameInput.value = user.lastName || "";

    const userEmailInput = document.getElementById("user_email");
    if (userEmailInput) userEmailInput.value = user.email || "";

    const userAddressInput = document.getElementById("user_address");
    if (userAddressInput) userAddressInput.value = user.address || "";

    const userDetails = document.getElementById("user-details");
    if (userDetails) {
      userDetails.innerHTML = `
        <strong>Logged in as:</strong> ${user.email}<br>
        <img src="${user.image}" alt="Profile" style="width:64px;height:64px;border-radius:50%;">
      `;
    }
  } else {
    const userDetails = document.getElementById("user-details");
    if (userDetails) {
      userDetails.innerHTML = `<span class="text-danger">No user logged in.</span>`;
    }
  }

  // Feedback spans
  const firstName = document.getElementById("first_name");
  const lastName = document.getElementById("last_name");
  const email = document.getElementById("user_email");
  const address = document.getElementById("user_address");

  const firstNameFeedback = document.getElementById("first_name-feedback");
  const lastNameFeedback = document.getElementById("last_name-feedback");
  const emailFeedback = document.getElementById("user_email-feedback");
  const addressFeedback = document.getElementById("user_address-feedback");

  const nameRegex = /^[A-Za-z\s]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addressRegex = /^.{5,}$/;

  firstName.addEventListener("input", function () {
    if (!nameRegex.test(firstName.value.trim())) {
      firstNameFeedback.textContent =
        "Please enter a valid first name (letters and spaces only, min 2 chars).";
    } else {
      firstNameFeedback.textContent = "";
    }
  });

  lastName.addEventListener("input", function () {
    if (!nameRegex.test(lastName.value.trim())) {
      lastNameFeedback.textContent =
        "Please enter a valid last name (letters and spaces only, min 2 chars).";
    } else {
      lastNameFeedback.textContent = "";
    }
  });
  email.addEventListener("input", function () {
    if (!emailRegex.test(email.value.trim())) {
      emailFeedback.textContent = "Please enter a valid email address.";
    } else {
      emailFeedback.textContent = "";
    }
  });
  address.addEventListener("input", function () {
    if (!addressRegex.test(address.value.trim())) {
      addressFeedback.textContent = "Please enter a valid address (min 5 chars).";
    } else {
      addressFeedback.textContent = "";
    }
  });

  // Password fields and feedback
  const curruntPassword = document.getElementById("currunt_password");
  const newPassword = document.getElementById("new_password");
  const confPassword = document.getElementById("conf_password");

  const curruntPasswordFeedback = document.getElementById("currunt_password-feedback");
  const newPasswordFeedback = document.getElementById("new_password-feedback");
  const confPasswordFeedback = document.getElementById("conf_password-feedback");

  // Password regex: min 6 chars, at least 1 letter and 1 number
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (curruntPassword) {
    curruntPassword.addEventListener("input", function () {
      curruntPasswordFeedback.textContent = "";
    });
  }
  if (newPassword) {
    newPassword.addEventListener("input", function () {
      if (!passwordRegex.test(newPassword.value.trim())) {
        newPasswordFeedback.textContent = "Password must be at least 6 characters and contain letters and numbers.";
      } else {
        newPasswordFeedback.textContent = "";
      }
    });
  }
  if (confPassword) {
    confPassword.addEventListener("input", function () {
      if (confPassword.value.trim() !== newPassword.value.trim()) {
        confPasswordFeedback.textContent = "Passwords do not match.";
      } else {
        confPasswordFeedback.textContent = "";
      }
    });
  }

  document
    .getElementById("edit-profile-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Get values
      const firstNameVal = firstName.value.trim();
      const lastNameVal = lastName.value.trim();
      const emailVal = email.value.trim();
      const addressVal = address.value.trim();

      // Password validation
      let valid = true;
      // Only validate password fields if any of them is filled
      const currPass = curruntPassword ? curruntPassword.value.trim() : "";
      const newPass = newPassword ? newPassword.value.trim() : "";
      const confPass = confPassword ? confPassword.value.trim() : "";

      if (currPass || newPass || confPass) {
        // All must be filled
        if (!currPass) {
          curruntPasswordFeedback.textContent = "Enter your current password.";
          valid = false;
        } else {
          curruntPasswordFeedback.textContent = "";
        }
        if (!passwordRegex.test(newPass)) {
          newPasswordFeedback.textContent = "Password must be at least 6 characters and contain letters and numbers.";
          valid = false;
        } else {
          newPasswordFeedback.textContent = "";
        }
        if (newPass !== confPass) {
          confPasswordFeedback.textContent = "Passwords do not match.";
          valid = false;
        } else {
          confPasswordFeedback.textContent = "";
        }
        // Optionally: check if currPass matches user's current password if you store it
      } else {
        curruntPasswordFeedback.textContent = "";
        newPasswordFeedback.textContent = "";
        confPasswordFeedback.textContent = "";
      }

      if (!valid) return;

      // Update user object from all fields
      user.firstName = firstNameVal;
      user.lastName = lastNameVal;
      user.email = emailVal;
      user.address = addressVal;
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Clear feedback and show success
      firstNameFeedback.textContent = "";
      lastNameFeedback.textContent = "";
      emailFeedback.textContent = "";
      addressFeedback.textContent = "";

      const userDetails = document.getElementById("user-details");
      if (userDetails) {
        userDetails.innerHTML = `
        <strong>Logged in as:</strong> ${user.email}<br>
        <img src="${user.image}" alt="Profile" style="width:64px;height:64px;border-radius:50%;">
      `;
      }
    });
});

function togglePasswordVisibility(inputId, iconElem) {
  const input = document.getElementById(inputId);
  if (input) {
    const type = input.getAttribute("type") === "password" ? "text" : "password";
    input.setAttribute("type", type);
    if (iconElem) {
      iconElem.className =
        type === "password"
          ? "fa-solid fa-eye-slash toggle-password-icon"
          : "fa-solid fa-eye toggle-password-icon";
    }
  }
}