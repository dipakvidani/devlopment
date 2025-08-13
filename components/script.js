// Use absolute paths so this works from any components/* page
fetch("/components/header/header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header").innerHTML = html;
    // After header loads, update icons based on localStorage
    try {
      const updateCounts = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const wishlistCount = document.querySelector('#header .wishlist-count');
        const cartCount = document.querySelector('#header .cart-count');
        const heartIcon = document.querySelector('#header a[title="Wishlist"] i');
        if (wishlistCount) {
          wishlistCount.textContent = wishlist.length;
          wishlistCount.style.display = wishlist.length ? 'block' : 'none';
        }
        if (heartIcon) {
          heartIcon.className = wishlist.length ? 'fa-solid fa-heart fs-5 text-danger' : 'fa-solid fa-heart fs-5';
        }
        if (cartCount) {
          cartCount.textContent = cart.length;
          cartCount.style.display = cart.length ? 'block' : 'none';
        }
      };
      updateCounts();
      window.addEventListener('storage', updateCounts);
    } catch {}
  })
  .catch((error) => {
    console.error("Failed to load the header.html:", error);
  });

//home page
// fetch("./home/home.html")
//   .then((response) => response.text())
//   .then((html) => {
//     document.getElementById("main-content").innerHTML = html;
//     if (window.renderProducts) {
//       window.renderProducts();
//     }
//     if (window.renderFeatures) {
//       window.renderFeatures();
//     }
//   })
//   .catch((error) => {
//     console.error("Failed to load the home-page.html:", error);
//   });

//login Form
  // fetch("../components/login/login.html")
  //   .then((response) => response.text())
  //   .then((html) => {
  //     document.getElementById("main-content").innerHTML = html;
  //   })
  //   .catch((error) => {
  //     console.error("Failed to load the login.html:", error);
  //   });

//  fetch("../components/product-card/product-card.html")
// .then((response) => response.text())
// .then((html) => {
//   document.getElementById("product-container-home").innerHTML = html;
// })
// .catch((error) => {
//   console.error("Failed to load the product-card.html:", error);
// });

//footer
fetch("/components/footer/footer.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("footer").innerHTML = html;
  })
  .catch((error) => {
    console.error("Failed to load the footer.html:", error);
  });

//wishlist page
// fetch("./wishlist/wishlist-page.html")
//   .then((response) => response.text())
//   .then((html) => {
//     document.getElementById("main-content").innerHTML = html;
//     if (window.renderProducts) {
//       window.renderProducts();
//     }
//   })
//   .catch((error) => {
//     console.error("Failed to load the wishlist-page.html:", error);
//   });

//cart page

// fetch("./cart/cart.html")
//   .then((response) => response.text())
//   .then((html) => {
//     document.getElementById("main-content").innerHTML = html;
//     if (window.renderProducts) {
//       window.renderProducts();
//     }
//   })
//   .catch((error) => {
//     console.error("Failed to load the cart.html:", error);
//   });

// billing page

// fetch("./billing/billing.html")
//   .then((response) => response.text())
//   .then((html) => {
//     document.getElementById("main-content").innerHTML = html;
//     if (window.renderBillingDetails) {
//       window.renderBillingDetails();
//     }
//   })
//   .catch((error) => {
//     console.error("Failed to load the billing.html:", error);
//   });

// edit profile

// fetch("./edit-profile/edit-profile.html")
//   .then((response) => response.text())
//   .then((html) => {
//     document.getElementById("main-content").innerHTML = html;
//   })
//   .catch((error) => {
//     console.error("Failed to load the edit-profile.html:", error);
//   });
