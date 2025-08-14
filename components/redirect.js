// Redirect logic for index.html

if (window.location.pathname.endsWith("index.html")) {
  if (localStorage.getItem("isLoggedIn") === "true") {
    window.location.href = "/components/home/home.html";
  } else {
    window.location.href = "/components/login/login.html";
  }
}
