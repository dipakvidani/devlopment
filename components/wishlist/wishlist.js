const wishlist_products = [
  {
    id: 1,
    title: "Breed Dry Dog Food",
    price: 100,
    rating: 3.5,
    reviews: 35,
    image: "../../assets/Images/cesar-product.png",
    discount: "10",
  },
  {
    id: 2,
    title: "Canon EOS DSLR Camera",
    price: 380,
    rating: 4,
    reviews: 95,
    image: "../../assets/Images/camera.png",
    discount: "15",
  },
  {
    id: 3,
    title: "ASUS FHD Gaming Laptop",
    price: 700,
    rating: 4.5,
    reviews: 325,
    image: "../../assets/Images/laptop.png",
    discount: "20",
  },
  {
    id: 4,
    title: "Curology Product Set",
    price: 500,
    rating: 4,
    reviews: 145,
    image: "../../assets/Images/skincare.png",
    discount: "5",
  },
  {
    id: 5,
    title: "Kids Electric Car",
    price: 960,
    rating: 5,
    reviews: 65,
    image: "../../assets/Images/kids-car.png",
    discount: "25",
  },
  {
    id: 6,
    title: "Jr. Zoom Soccer Cleats",
    price: 1160,
    rating: 4.5,
    reviews: 35,
    image: "../../assets/Images/shoes.png",
    discount: "30",
  },
  {
    id: 7,
    title: "GP11 Shooter USB Gamepad",
    price: 660,
    rating: 4,
    reviews: 55,
    image: "../../assets/Images/gamepad.png",
    discount: "12",
  },
  {
    id: 8,
    title: "Quilted Satin Jacket",
    price: 660,
    rating: 4,
    reviews: 55,
    image: "../../assets/Images/jacket.png",
    discount: "18",
  },
];


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

  wishlist_products.slice(0, 4).forEach((p) => {
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
           alt="${p.name}" 
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

    wishlist_products.slice(4).forEach((p) => {
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
                alt="${p.name}" 
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
