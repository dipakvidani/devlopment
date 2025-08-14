// Use absolute paths so this works from any components/* page
fetch("/components/header/header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header").innerHTML = html;
    attachProfileDropdown();
    // Hide header icons if not logged in
    const headerIcons = document.getElementById("header-icons");
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (headerIcons) {
      headerIcons.style.display = isLoggedIn ? "flex" : "none";
    }

    //setTimeout to ensure dropdown logic
    setTimeout(() => {
      const dropdownTrigger = document.getElementById("profileDropdown");
      const dropdownMenu = dropdownTrigger && dropdownTrigger.nextElementSibling;
      if (dropdownTrigger && dropdownMenu) {
        // Remove previous listeners if any
        dropdownTrigger.onclick = null;
        document.onclick = null;

        dropdownTrigger.addEventListener("click", function (e) {
          e.stopPropagation();
          dropdownMenu.classList.toggle("show");
        });
        document.addEventListener("click", function (e) {
          if (
            !dropdownTrigger.contains(e.target) &&
            !dropdownMenu.contains(e.target)
          ) {
            dropdownMenu.classList.remove("show");
          }
        });
      }
    }, 200);
    // After header loads, update icons based on localStorage
    try {
      window.updateCounts();
      window.addEventListener('storage', window.updateCounts);
    } catch {}
  })
  .catch((error) => {
    console.error("Failed to load the header.html:", error);
  });

// Dynamically load footer on all pages
fetch("/components/footer/footer.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("footer").innerHTML = html;
  })
  .catch((error) => {
    console.error("Failed to load the footer.html:", error);
  });

function attachProfileDropdown() {
  const dropdownTrigger = document.getElementById("profileDropdown");
  const dropdownMenu = dropdownTrigger && dropdownTrigger.nextElementSibling;
  if (dropdownTrigger && dropdownMenu) {
    dropdownTrigger.onclick = null;
    document.onclick = null;
    dropdownTrigger.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle("show");
    });
    document.addEventListener("click", function (e) {
      if (
        !dropdownTrigger.contains(e.target) &&
        !dropdownMenu.contains(e.target)
      ) {
        dropdownMenu.classList.remove("show");
      }
    });
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "/components/login/login.html";
}

window.updateCounts = function() {
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const wishlistCount = document.querySelector('#header .wishlist-count');
  const cartCount = document.querySelector('#header .cart-count');

  // Update wishlist count
  if (wishlistCount) {
    wishlistCount.textContent = wishlist.length;
    wishlistCount.style.display = wishlist.length ? 'block' : 'none';
  }
 
  // Update heart icon
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    cartCount.style.display = cart.length ? 'block' : 'none';
  }
};