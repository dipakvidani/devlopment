function renderBillingDetails() {
  const isCouponApplied = localStorage.getItem("isCouponApplied") === "true";
  const paymentTable = document.querySelector("#payment-table tbody");
  if (!paymentTable) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  let subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  let discount = isCouponApplied ? subtotal * 0.3 : 0;
  let total = subtotal - discount;

  let html = "";
  cart.forEach((item) => {
    html += `
      <tr>
        <td>
          <img src="../${item.image}" alt="${
      item.title
    }" style="width:40px;height:40px;object-fit:cover;margin-right:10px;">
          ${item.title}
        </td>
        <td class="text-end">$${(item.price * (item.qty || 1)).toFixed(2)}</td>
      </tr>
    `;
  });

  html += `
    <tr>
      <td class="text-start fw-bold">Subtotal:</td>
      <td class="text-end">$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
      <td class="fw-bold">Shipping:</td>
      <td class="text-end">Free</td>
    </tr>
    <tr class="border-bottom">
      <td class="fw-bold">Discount:</td>
      <td class="text-end">${isCouponApplied ? "-30%" : "0%"}</td>
    </tr>
    <tr>
      <td class="fw-bold">Total:</td>
      <td class="text-end" id="cart-total">$${total.toFixed(2)}</td>
    </tr>
  `;

  paymentTable.innerHTML = html;
}

window.renderBillingDetails = renderBillingDetails;

document.addEventListener("DOMContentLoaded", () => {
  renderBillingDetails();
});

function handleOrder() {
  const order = JSON.parse(localStorage.getItem("cart") || "[]");
  if (order.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  let isCouponApplied = localStorage.getItem("isCouponApplied") === "true";
  let totalWithDiscount = order.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  let total = isCouponApplied ? totalWithDiscount * 0.7 : totalWithDiscount;
  localStorage.removeItem("cart");
  alert(`Order placed successfully! Total amount: $${total.toFixed(2)}`);
  window.location.href = "../home/home.html";
}

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
      localStorage.setItem("isCouponApplied", "true");
      if (couponCode === discountCode) {
        couponcode_feedback.innerText =
          "Coupon applied successfully! You get a 30% discount.";
        couponcode_feedback.classList.replace("text-danger", "text-success");

        renderBillingDetails();
        isValidCoupon = true;
        couponInput.value = "";
      } else {
        isValidCoupon = false;
        couponInput.value = "";

        // Show feedback for invalid coupon
        couponcode_feedback.innerText =
          "Invalid coupon code. Please try again.";
        couponcode_feedback.classList.replace("text-danger", "text-success");
        renderBillingDetails();
      }
    } else {
      // Show feedback for already applied coupon
      couponcode_feedback.innerText = "Coupon has already been applied.";
      couponcode_feedback.classList.replace("text-success", "text-danger");
      renderBillingDetails();
    }
  });
