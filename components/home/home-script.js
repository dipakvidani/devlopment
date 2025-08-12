// Home page functionality - using centralized data
// This file now uses the centralized data from assets/js/data.js

function renderProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  let html = "";
  PRODUCTS_DATA.forEach((product) => {
    html += `
      <div class="col-md-3 mb-4 d-flex">
        <div class="card border-0 h-100 w-100 d-flex flex-column">

          <div class="p-5 bg-secondary-subtle rounded-3 position-relative d-flex justify-content-center align-items-center" style="min-height: 220px;">

            <button class="btn btn-outline-secondary position-absolute top-0 end-0 m-2 rounded-5 bg-white border-0">
              <i class="fa-regular fa-heart text-secondary"></i>
            </button>

            <button class="btn btn-outline-secondary position-absolute top-0 end-0 m-2 mt-5 rounded-5 bg-white border-0 ">
              <i class="fa-regular fa-eye text-secondary"></i>
            </button>

            <!-- Product image -->
            <img src="${product.image}" class="img-fluid" alt="${
      product.title
    }" style="max-width: 120px; max-height: 120px; object-fit: contain;">
          </div>

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
}

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

// Make functions available globally
window.renderProducts = renderProducts;
window.renderFeatures = renderFeatures;

// Auto-initialize when this page is opened directly
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderProducts === "function") {
    renderProducts();
  }
  if (typeof renderFeatures === "function") {
    renderFeatures();
  }
});
  