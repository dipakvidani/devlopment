// Wishlist functionality - using centralized data
// This file now uses the centralized data from assets/js/data.js

function generateStars(rating) {
  let stars = "";
  let full = Math.floor(rating);
  let half = rating % 1 !== 0;

  // Full stars
  for (let i = 0; i < full; i++) {
    stars += '<i class="fa-solid fa-star text-warning"></i>';
  }

  // Half star
  if (half) {
    stars += '<i class="fa-solid fa-star-half-stroke text-warning"></i>';
  }

  // Empty stars
  let totalStars = full + (half ? 1 : 0);
  for (let i = totalStars; i < 5; i++) {
    stars += '<i class="fa-regular fa-star text-secondary"></i>';
  }

  return stars;
}

function renderProducts() {
  let container = document.getElementById("product-list");

  // Get first 4 products for wishlist
  const wishlistProducts = WISHLIST_PRODUCTS.slice(0, 4);

  wishlistProducts.forEach((p) => {
    container.innerHTML += `<div class="col-md-3 col-sm-6 d-flex">
  <div class="card position-relative flex-fill shadow-none border-0 h-100">

    <!-- Discount Badge -->
    <span class="badge bg-danger position-absolute top-0 start-0 m-2">
      -${p.discount}%
    </span>

    <!-- Trash Icon -->
    <button class="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle">
      <i class="fa-solid fa-trash text-danger"></i>
    </button>

    <!-- Image wrapper -->
    <div class="card-img-top p-3 bg-secondary-subtle">
      <img src="${p.image}" 
           alt="${p.title}" 
           class="w-100 img-fluid" 
           style="height:300px; ">
    </div>
     <div class="mt-auto">
        <button class="btn btn-dark text-light w-100">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
      </div>

    <div class="card-body d-flex flex-column">
      <h6 class="card-title">${p.title}</h6>
      <p class="mb-2">
        <span class="fw-bold text-danger">
          $${(p.price - (p.price * parseFloat(p.discount)) / 100).toFixed(2)}
        </span>
        <span class="text-secondary text-decoration-line-through">
          $${p.price}
        </span>
      </p>
     
    </div>

  </div>
</div>

  `;
  });

  //just for you
    let justForYouContainer = document.getElementById("product-list-just-for-you");

    // Get remaining products for "Just For You"
    const justForYouProducts = WISHLIST_PRODUCTS.slice(4);

    justForYouProducts.forEach((p) => {
    justForYouContainer.innerHTML += `<div class="col-md-3 col-sm-6 d-flex">
        <div class="card position-relative flex-fill shadow-none border-0 h-100">

            <!-- Discount Badge -->
            <span class="badge bg-danger position-absolute top-0 start-0 m-2">
            -${p.discount}%
            </span>

            <!-- Trash Icon -->
            <button class="btn btn-sm btn-light position-absolute top-0 end-0 m-2 rounded-circle">
            <i class="fa-solid fa-trash text-danger"></i>
            </button>

            <!-- Image wrapper -->
            <div class="card-img-top p-3 bg-secondary-subtle">
            <img src="${p.image}" 
                alt="${p.title}" 
                class="w-100 img-fluid" 
                style="height:300px;">
            </div>
            <div class="mt-auto">
                <button class="btn btn-dark text-light w-100">
                <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>

            <div class="card-body d-flex flex-column">
            <h6 class="card-title">${p.title}</h6>
            <p class="mb-2">
                <span class="fw-bold text-danger">
                $${(p.price - (p.price * parseFloat(p.discount)) / 100).toFixed(2)}
                </span>
                <span class="text-secondary text-decoration-line-through">
                $${p.price}
                </span>
            </p>
            <p class="d-flex justify-content-start align-items-center">
              <span class="text-warning">${generateStars(p.rating)}</span>
              <span class="text-secondary ms-2">(${p.reviews} reviews)</span>
            </p>
            
            </div>

        </div>
        </div>

  `;
  });
}

// Make function available globally
window.renderProducts = renderProducts;

// Auto-initialize when this page is loaded
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderProducts === "function") {
    renderProducts();
  }
});
