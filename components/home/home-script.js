const products = [
    {
      id: 1,
      title: "Breed Dry Dog Food",
      price: 100,
      rating: 3.5,
      reviews: 35,
      image: "../../assets/Images/cesar-product.png",
    },
    {
      id: 2,
      title: "Canon EOS DSLR Camera",
      price: 380,
      rating: 4,
      reviews: 95,
      image: "../../assets/Images/camera.png",
    },
    {
      id: 3,
      title: "ASUS FHD Gaming Laptop",
      price: 700,
      rating: 4.5,
      reviews: 325,
      image: "../../assets/Images/laptop.png",
    },
    {
      id: 4,
      title: "Curology Product Set",
      price: 500,
      rating: 4,
      reviews: 145,
      image: "../../assets/Images/skincare.png",
    },
    {
      id: 5,
      title: "Kids Electric Car",
      price: 960,
      rating: 5,
      reviews: 65,
      image: "../../assets/Images/kids-car.png",
    },
    {
      id: 6,
      title: "Jr. Zoom Soccer Cleats",
      price: 1160,
      rating: 4.5,
      reviews: 35,
      image: "../../assets/Images/shoes.png",
    },
    {
      id: 7,
      title: "GP11 Shooter USB Gamepad",
      price: 660,
      rating: 4,
      reviews: 55,
      image: "../../assets/Images/gamepad.png",
    },
    {
      id: 8,
      title: "Quilted Satin Jacket",
      price: 660,
      rating: 4,
      reviews: 55,
      image: "../../assets/Images/jacket.png",
    },
  ];
  
  function generateStars(rating) {
    let stars = "";
    let full = Math.floor(rating);
    let half = rating % 1 !== 0;
  
    for (let i = 0; i < full; i++) {
      stars += '<i class="fa-solid fa-star text-warning"></i>';
    }
  
    if (half) {
      stars += '<i class="fa-solid fa-star-half-stroke text-warning"></i>';
    }
  
    let totalStars = full + (half ? 1 : 0);
    for (let i = totalStars; i < 5; i++) {
      stars += '<i class="fa-regular fa-star text-secondary"></i>';
    }
  
    return stars;
  }
  
  function renderProducts() {
    const container = document.getElementById("product-list");
    if (!container) return;
  
    let html = "";
    products.forEach((product) => {
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
    const featuresData = [
      {
        icon: "fa-truck",
        title: "Free and Fast Delivery",
        description: "Free delivery on orders over $140",
      },
      {
        icon: "fa-headset",
        title: "24/7 Customer Support",
        description: "Friendly 24/7 customer support",
      },
      {
        icon: "fa-shield-alt",
        title: "Money Back Guarantee",
        description: "We return money within 30 days",
      },
    ];
  
    const features = document.getElementById("features");
    if (!features) return;
  
    let html = "";
    featuresData.forEach((feature) => {
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
  
  window.renderProducts = renderProducts;
  window.renderFeatures = renderFeatures;
  