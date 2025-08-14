// Attach a delegated submit handler so it works even if the form is injected later
document.addEventListener("submit", function (event) {
  const target = event.target;
  if (!target || target.tagName !== "FORM") return;

  const emailInput = target.querySelector("#userEmail");
  const passwordInput = target.querySelector("#userPassword");
  if (!emailInput || !passwordInput) return; 

  console.log("Submitting login form...");
  event.preventDefault();

  const submitButton = target.querySelector('button[type="submit"]');

  if (!emailInput.value || !passwordInput.value) {
    alert("Please enter username and password");
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Logging in...";
  }

  console.log("Sending request to login API...");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://dummyjson.com/auth/login");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    console.log("XHR request completed with status:", xhr.status);
    console.log("Raw response text:", xhr.responseText);

    if (xhr.status >= 200 && xhr.status < 300) {
      try {
        const data = JSON.parse(xhr.responseText || "{}");
        console.log("Parsed login response:", data);

        // Save session data
        localStorage.setItem("authToken", data.accessToken || "");
        localStorage.setItem("currentUser", JSON.stringify(data));
        localStorage.setItem("isLoggedIn", "true");
      } catch {
        console.warn("Failed to parse login response");
      }
    //   alert("Login successful!");
      location.href = "../home/home.html";
    } else {
      let errorMsg = "Login failed!";
      try {
        const errData = JSON.parse(xhr.responseText || "{}");
        if (errData && errData.message) errorMsg = errData.message;
      } catch {}
      console.warn("Login failed with message:", errorMsg);
      alert(errorMsg);
    }

    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Login";
    }
  };

  xhr.onerror = function () {
    console.error("Network error while calling API");
    alert("Network error");
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Login";
    }
  };

  xhr.send(
    JSON.stringify({
      username: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    })
  );
});
