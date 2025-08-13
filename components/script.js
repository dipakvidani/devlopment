fetch("./header/header.html")
  .then((response) => response.text())
  .then((html) => {
    document.getElementById("header").innerHTML = html;
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
fetch("./footer/footer.html")
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
