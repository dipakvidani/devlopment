// Wishlist page logic that uses centralized PRODUCTS_DATA from assets/js/data.js

function generateStars(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  let stars = "";

  for (let i = 0; i < full; i++) stars += '<i class="fa-solid fa-star text-warning"></i>';
  if (hasHalf) stars += '<i class="fa-solid fa-star-half-stroke text-warning"></i>';
  for (let i = full + (hasHalf ? 1 : 0); i < 5; i++) stars += '<i class="fa-regular fa-star text-secondary"></i>';

  return stars;
}

function getWishlistIds() {
  try {
    return JSON.parse(localStorage.getItem("wishlist") || "[]");
  } catch {
    return [];
  }
}

function setWishlistIds(ids) {
  localStorage.setItem("wishlist", JSON.stringify(ids));
}

function renderWishlist() {
  const wishlistContainer = document.getElementById("wishlist-container");
  const wishlistCountEl = document.getElementById("wishlist-count");
  if (!wishlistContainer || !Array.isArray(PRODUCTS_DATA)) return;

  const ids = getWishlistIds();
  if (wishlistCountEl) wishlistCountEl.textContent = ids.length;

  if (ids.length === 0) {
    wishlistContainer.innerHTML = `
      <div class="text-center py-5">
        <p class="mb-3">Your wishlist is empty.</p>
        <a href="/components/home/home.html" class="btn btn-dark">Go Shopping</a>
      </div>
    `;
  } else {
    const products = PRODUCTS_DATA.filter(p => ids.includes(p.id));
    wishlistContainer.innerHTML = `
      <div class="row g-4">
        ${products.map(p => `
          <div class="col-md-3 col-sm-6 d-flex">
            <div class="card position-relative flex-fill shadow-none border-0 h-100">
              <button class="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle" onclick="removeFromWishlist(${p.id})" title="Remove">
                <i class="fa-solid fa-trash text-danger"></i>
              </button>
              <div class="card-img-top p-4 bg-secondary-subtle d-flex align-items-center justify-content-center" style="min-height: 220px;">
                <img src="${p.image}" alt="${p.title}" class="img-fluid" style="max-height: 160px; object-fit: contain;">
              </div>
              <button class="btn btn-dark mt-auto" onclick="addToCartFromWishlist(${p.id})">
                <i class="fa-solid fa-cart-plus me-2"></i>Add to Cart
              </button>
              <div class="card-body d-flex flex-column">
                <h6 class="card-title">${p.title}</h6>
                <div class="d-flex align-items-center mb-2">
                  <span class="fw-bold text-danger me-2">$${p.price}</span>
                </div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  renderJustForYou(ids);
}

function renderJustForYou(wishlistIds) {
  const container = document.getElementById("product-list-just-for-you");
  //if container is not found or PRODUCTS_DATA is not an array, return
  if (!container || !Array.isArray(PRODUCTS_DATA)) return;

  const recommendations = PRODUCTS_DATA.filter(p => !wishlistIds.includes(p.id)).slice(0, 4);
  container.innerHTML = recommendations.map(p => `
    <div class="col-md-3 col-sm-6 d-flex">
      <div class="card position-relative flex-fill shadow-none border-0 h-100">
        <div class="card-img-top p-4 bg-secondary-subtle d-flex align-items-center justify-content-center" style="min-height: 220px;">
       <button class="btn btn-outline-secondary position-absolute top-0 end-0 m-2 rounded-5 bg-white border-0 ">
              <i class="fa-regular fa-eye text-secondary"></i>
            </button>   
            <img src="${p.image}" alt="${p.title}" class="img-fluid" style="max-height: 160px; object-fit: contain;">
          </div>
          <button class="btn btn-dark mt-auto">
            <i class="fa-solid fa-cart-plus me-2"></i>Add to Cart
          </button>
        <div class="card-body d-flex flex-column">
          <h6 class="card-title">${p.title}</h6>
          <div class="d-flex align-items-center mb-2">
            <span class="fw-bold text-danger me-2">$${p.price}</span>
          </div>

          <div class="d-flex align-items-center mb-2">
          <span class="text-warning">${generateStars(p.rating)}</span>
            <span class="text-secondary small ms-2">(${p.reviews})</span>
          </div>
          
        </div>
      </div>
    </div>
  `).join("");
}

function addToWishlist(productId) {
  const ids = getWishlistIds();
  if (!ids.includes(productId)) {
    ids.push(productId);
    setWishlistIds(ids);
    renderWishlist();
  }
}

function removeFromWishlist(productId) {
  const ids = getWishlistIds().filter(id => id !== productId);
  setWishlistIds(ids);
  renderWishlist();
}

function addToCartFromWishlist(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  // Update header cart count if loaded dynamically
  const headerCartCount = document.querySelector("#header .cart-count");
  if (headerCartCount) {
    headerCartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    headerCartCount.style.display = cart.length ? "block" : "none";
  }
}

window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.addToCartFromWishlist = addToCartFromWishlist;

// render wishlist on page load
document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();
});
