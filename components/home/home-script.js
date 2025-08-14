// Generate stars
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fa-solid fa-star text-warning"></i>';
  }

  if (hasHalfStar) {
    stars += '<i class="fa-solid fa-star-half-stroke text-warning"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="fa-regular fa-star text-warning"></i>';
  }

  return stars;
}

// Render products
function renderProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  let html = "";
  PRODUCTS_DATA.forEach((product) => {
    const isInWishlist = isProductInWishlist(product.id);
    html += `
      <div class="col-md-3 mb-4 d-flex">
        <div class="card border-0 h-100 w-100 d-flex flex-column" id="product-${product.id}">
          <div class="p-5 bg-secondary-subtle rounded-3 position-relative d-flex justify-content-center align-items-center" style="min-height: 220px;">

            <button class="btn btn-outline-secondary position-absolute top-0 end-0 m-2 rounded-5 bg-white border-0 wishlist-btn" 
                    id="wishlist-${product.id}" 
                    onclick="toggleWishlist(${product.id})">
              <i class="fa-${isInWishlist ? "solid" : "regular"} fa-heart text-${isInWishlist ? "danger" : "secondary"}"></i>
            </button>

            <button class="btn btn-outline-secondary position-absolute top-0 end-0 m-2 mt-5 rounded-5 bg-white border-0 ">
              <i class="fa-regular fa-eye text-secondary"></i>
            </button>

            <img src="${product.image}" class="img-fluid" alt="${product.title}" 
                 style="max-width: 120px; max-height: 120px; object-fit: contain;">
          </div>

          <button class="btn btn-dark opacity-0 transition-all" id="addToCart-${product.id}">Add to Cart</button>

          <div class="card-body d-flex flex-column flex-grow-1">
            <h6 class="fw-bold">${product.title}</h6>
            <div class="mt-auto d-flex justify-content-between align-items-center">
              <span class="text-danger fw-bold">$${product.price}</span>
              <span>${generateStars(product.rating)}</span>
              <span class="text-secondary small">(${product.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Hover events for showing/hiding Add to Cart
  PRODUCTS_DATA.forEach((product) => {
    const productCard = document.getElementById(`product-${product.id}`);
    const addToCartButton = document.getElementById(`addToCart-${product.id}`);

    if (productCard && addToCartButton) {
      productCard.addEventListener("mouseenter", () => {
        addToCartButton.classList.remove("opacity-0");
        addToCartButton.classList.add("opacity-100");
      });

      productCard.addEventListener("mouseleave", () => {
        addToCartButton.classList.add("opacity-0");
        addToCartButton.classList.remove("opacity-100");
      });

      // Add to cart click
      addToCartButton.addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
          existingItem.qty += 1;
        } else {
          cart.push({ ...product, qty: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateHeaderIcons(); 
        const headerCartCount = document.querySelector("#header .cart-count");
        if (headerCartCount) {
          headerCartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
          headerCartCount.style.display = cart.length ? "block" : "none";
        }
      });
    }
  });
}

// Render features
function renderFeatures() {
  const features = document.getElementById("features");
  if (!features) return;

  let html = "";
  FEATURES_DATA.forEach((feature) => {
    html += `
      <div class="col-md-4 mb-4">
        <div class="card border-0 h-100 d-flex flex-column align-items-center">
          <div class="rounded-circle bg-secondary-subtle d-flex justify-content-center align-items-center p-4 mt-3">
            <div class="rounded-circle bg-dark d-flex justify-content-center align-items-center p-3">
              <i class="fa-solid ${feature.icon} text-white fs-1"></i>
            </div>
          </div>
          <div class="card-body text-center">
            <h5 class="mt-3 fw-bold">${feature.title}</h5>
            <p class="fw-medium text-muted">${feature.description}</p>
          </div>
        </div>
      </div>
    `;
  });

  features.innerHTML = html;
}

// Wishlist check
function isProductInWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  return wishlist.includes(productId);
}

// Toggle wishlist
function toggleWishlist(productId) {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  const isInWishlist = wishlist.includes(productId);

  if (isInWishlist) {
    const newWishlist = wishlist.filter((id) => id !== productId);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));

    const button = document.getElementById(`wishlist-${productId}`);
    if (button) {
      const icon = button.querySelector("i");
      icon.className = "fa-regular fa-heart text-secondary";
    }
  } else {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    const button = document.getElementById(`wishlist-${productId}`);
    if (button) {
      const icon = button.querySelector("i");
      icon.className = "fa-solid fa-heart text-danger";
    }
  }

  updateHeaderIcons();
}

// Update header icons
function updateHeaderIcons() {
  const wishlistCount = document.querySelector(".wishlist-count");
  if (wishlistCount) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    wishlistCount.textContent = wishlist.length;
  }

  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length ? "block" : "none";
  }
}

// Global
window.renderProducts = renderProducts;
window.renderFeatures = renderFeatures;
window.toggleWishlist = toggleWishlist;

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderFeatures();
  updateHeaderIcons();
});
