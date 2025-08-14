document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("/components/header/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("header").innerHTML = data;
      updateHeaderIcons();
      handleAuthState();

      // Attach dropdown logic after header is loaded
      const dropdownTrigger = document.getElementById("profileDropdown");
      if (dropdownTrigger) {
        dropdownTrigger.addEventListener("click", function (e) {
          e.stopPropagation();
          const menu = this.nextElementSibling;
          if (menu) menu.classList.toggle("show");
        });
        document.addEventListener("click", function (e) {
          const menu = dropdownTrigger.nextElementSibling;
          if (
            menu &&
            !dropdownTrigger.contains(e.target) &&
            !menu.contains(e.target)
          ) {
            menu.classList.remove("show");
          }
        });
      }
    })
    .catch((error) => console.error("Error loading header:", error));
});

function updateHeaderIcons() {
  const wishlistCount = document.querySelector(".wishlist-count");
  const cartCount = document.querySelector(".cart-count");

  // Update wishlist count
  if (wishlistCount) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    wishlistCount.textContent = wishlist.length;
    wishlistCount.style.display = wishlist.length ? "block" : "none";
  }

  // Update cart count
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length ? "block" : "none";
  }
}

function handleAuthState() {
  const profileDropdown = document.getElementById("profileDropdown");
  const logoutLink = document.getElementById("logout-link");
  const authNavItem = document.getElementById("auth-nav-item");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (isLoggedIn && currentUser.name) {
    // Show profile icon with the user's first letter
    if (profileDropdown) {
      profileDropdown.innerHTML = `<span class="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style="width: 30px; height: 30px;">${currentUser.name
        .charAt(0)
        .toUpperCase()}</span>`;
    }


    if (authNavItem) authNavItem.style.display = "none";
    if (logoutLink) logoutLink.style.display = "block";
  } else {

    if (authNavItem) authNavItem.style.display = "block";
    if (logoutLink) logoutLink.style.display = "none";
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("authToken");
  location.href = "/components/login/login.html";
}

function handleLogout() {
  var logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.onclick = function (e) {
      e.preventDefault();
      // Clear user session data here if needed
      localStorage.removeItem("user"); // example
      window.location.href = "/components/login/login.html";
    };
  }
}

let headerIcons= document.getElementById("header-icons");
if (headerIcons) {
  localStorage.getItem("isLoggedIn") ? headerIcons.classList.remove("d-none") : headerIcons.classList.add("d-none");
}
