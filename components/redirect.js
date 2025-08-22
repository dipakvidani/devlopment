// Redirect logic for all pages

function checkAuthAndRedirect() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const authToken = localStorage.getItem("authToken");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const validToken = currentUser?.accessToken === authToken;
  const isLoginPage = window.location.pathname.endsWith("login.html");
  const isIndexPage = window.location.pathname.endsWith("index.html");

  if (isLoggedIn && validToken) {
    // If logged in and on login page or index.html, redirect to home
    if (isLoginPage || isIndexPage) {
      window.location.replace("/components/home/home.html");
      // window.location.reload();
    }
    // Otherwise, allow access
  } else {
    // If not logged in and not on login page, redirect to login
    if (!isLoginPage) {
      window.location.href = "/components/login/login.html";
    }
    // Otherwise, allow access to login page
  }
}

checkAuthAndRedirect();

document.addEventListener("storage", checkAuthAndRedirect);
