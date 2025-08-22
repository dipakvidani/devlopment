document.addEventListener("DOMContentLoaded", () => {
  // Load header
  fetch("/components/header/header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data; // <-- fix here
      updateHeaderIcons();
      handleAuthState();
      updateUserAvatar(); // <-- call here after header is loaded

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

      // Hide header icons on login page (after header is loaded)
      if (window.location.pathname.endsWith("login.html")) {
        const headerIcons = document.getElementById("header-icons");
        if (headerIcons) {
          headerIcons.style.display = "none";
        }
      }
    })
    .catch((error) => console.error("Error loading header:", error));
});

function updateHeaderIcons() {
  const wishlistCount = document.querySelector(".wishlist-count");
  const cartCount = document.querySelector(".cart-count");
  const headerIcon = document.getElementById("header-icons");

  if (window.location.pathname.endsWith("login.html")) {
    if (headerIcon) {
      headerIcon.classList.remove("d-flex");
      headerIcon.classList.add("d-none");
    }
  }

  // Update wishlist count
  if (wishlistCount) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    wishlistCount.textContent = wishlist.length;
    // wishlistCount.style.display = wishlist.length ? "block" : "none";
  }

  // Update cart count
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartCount.textContent = cart.length;
    // cartCount.style.display = cart.length ? "block" : "none";
  }
}

function handleAuthState() {
  // Always update header icons when checking auth state
  updateHeaderIcons();

  const profileDropdown = document.getElementById("profileDropdown");
  const userAvatar = document.getElementById("user-avatar");
  const logoutLink = document.getElementById("logout-link");
  const authNavItem = document.getElementById("auth-nav-item");
  const headerIcons = document.getElementById("header-icons");

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (isLoggedIn && currentUser.firstName) {
    // Show profile icon with the user's first letter
    updateUserAvatar();

    if (authNavItem) authNavItem.style.display = "none";
    
    if (logoutLink) logoutLink.style.display = "block";
    if (headerIcons) headerIcons.style.display = "flex";
  } else {
    if (authNavItem) authNavItem.style.display = "block";
    if (logoutLink) logoutLink.style.display = "none";
    if (headerIcons) headerIcons.style.display = "none";
    if (userAvatar) {
      userAvatar.innerHTML = "";
    }
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("authToken");
  location.href = "/components/login/login.html";
}

function handleLogout() {
  let logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.onclick = function (e) {
      e.preventDefault();
      // Clear user session data here if needed
      localStorage.removeItem("currentUser");
      window.location.href = "/components/login/login.html";
    };
  }
}

let isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let authToken = localStorage.getItem("authToken");
let isValidToken =
  JSON.parse(localStorage.getItem("currentUser") || "{}").accessToken ===
  authToken;

if (isValidToken && isUserLoggedIn) {
  handleAuthState();
} else {
  const authNavItem = document.getElementById("auth-nav-item");
  if (authNavItem) {
    authNavItem.style.display = "none";
  }
}

function updateUserAvatar() {
  const userAvatar = document.getElementById("user-avatar");
  let currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  // Use firstName property for avatar initial
  if (userAvatar && currentUser.firstName) {
    userAvatar.innerHTML = `<span class="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center" style="width: 30px; height: 30px;">${currentUser.firstName
      .charAt(0)
      .toUpperCase()}</span>`;
  }
}

window.updateHeaderIcons = updateHeaderIcons;
