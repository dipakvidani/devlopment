function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const isCouponApplied = localStorage.getItem("isCouponApplied") === "true";

  console.log(cart);

  const tbody = document.getElementById("cart-items");
  if (!tbody) return;

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center">Your cart is empty.</td></tr>`;
    return;
  }

  tbody.innerHTML = cart
    .map(
      (item, idx) => `
    <tr>
      <td>
        <div class="d-flex align-items-center gap-2 justify-content-evenly">
          <button class="btn btn-danger btn-sm" onclick="removeFromCart(${idx})">
            <i class="fa-solid fa-trash"></i>
          </button>
          <img src="../${item.image}" alt="${
        item.title
      }" style="max-width:80px;" class="img-fluid" />
          <span>${item.title}</span>
        </div>
      </td>
      <td>$${item.price}</td>
            <td class="text-center align-middle">
        <input type="number" value="${item.qty || 1}" min="1" 
                class="form-control cart-qty-input" 
                data-idx="${idx}" style="width: 80px;" />
        </td>
      <td>$${(item.price * (item.qty || 1)).toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  tbody.querySelectorAll(".cart-qty-input").forEach((input) => {
    input.addEventListener("change", function () {
      const idx = parseInt(this.getAttribute("data-idx"));
      const newQty = Math.max(1, parseInt(this.value) || 1);
      cart[idx].qty = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
      updateHeaderIcons();
    });
  });

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const subtotalCell = document.getElementById("cart-subtotal");
  const totalCell = document.getElementById("cart-total");
  const discountCell = document.getElementById("cart-discount");

  // Update subtotal and total in the DOM
  if (isCouponApplied) {
    const discount = subtotal * 0.3; // 30% discount
    const total = subtotal - discount;
    totalCell.textContent = `$${total.toFixed(2)}`;
    discountCell.textContent = `-$${discount.toFixed(2)}`;
    subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
  } else {
    if (subtotalCell) subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
    if (totalCell) totalCell.textContent = `$${subtotal.toFixed(2)}`;
    if (discountCell) discountCell.textContent = `$0.00`;
  }
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
    // Show total quantity, not just number of products
    cartCount.textContent = cart.reduce(
      (sum, item) => sum + (item.qty || 1),
      0
    );
    cartCount.style.display = cart.length ? "block" : "none";
  }
}

function proceedToCheckout() {
  const order = JSON.parse(localStorage.getItem("cart") || "[]");

  //redirect to billing page
  if (order.length === 0) {
    alert(
      "Your cart is empty. Please add items to your cart before proceeding."
    );
    return;
  }
  localStorage.setItem("order", JSON.stringify(order));
  window.location.href = "/components/billing/billing.html";
}

const removeFromCart = (idx) => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.splice(idx, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateHeaderIcons();
};

document
  .getElementById("coupon-form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const couponInput = this.querySelector("input[name='coupon']");
    const couponCode = couponInput.value.trim();
    let discountCode = localStorage.getItem("coupon");
    let isValidCoupon = false;
    let isCouponApplied = localStorage.getItem("isCouponApplied") === "true";
    let couponcode_feedback = document.getElementById("coupon-feedback");

    if (!isCouponApplied) {
      if (couponCode === discountCode) {
        couponcode_feedback.innerText =
          "Coupon applied successfully! You get a 30% discount.";
        couponcode_feedback.classList.add("text-success");
        couponcode_feedback.classList.remove("text-danger");

        isValidCoupon = true;
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const subtotal = cart.reduce(
          (sum, item) => sum + item.price * (item.qty || 1),
          0
        );
        const discount = subtotal * 0.3; // 30% discount
        const total = subtotal - discount;

        document.getElementById("cart-total").textContent = `$${total.toFixed(
          2
        )}`;
        couponInput.value = ""; // Clear the input field
        localStorage.setItem("isCouponApplied", "true");
        renderCartItems();
      } else {
        isValidCoupon = false;
        couponInput.value = "";
        couponcode_feedback.innerText =
          "Invalid coupon code. Please try again.";
        couponcode_feedback.classList.add("text-danger");
        couponcode_feedback.classList.remove("text-success");
        renderCartItems();
      }
    } else {
      couponcode_feedback.innerText = "Coupon has already been applied.";
      couponcode_feedback.classList.add("text-danger");
      couponcode_feedback.classList.remove("text-success");
    }
  });

document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  updateHeaderIcons();
});
