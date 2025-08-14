// Billing functionality - using centralized data
// This file now uses the centralized data from assets/js/data.js

function renderBillingDetails() {
  const paymentTable = document.querySelector("#payment-table tbody");
  if (!paymentTable) return;

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  let html = "";
  cart.forEach(item => {
    html += `
      <tr>
        <td>
          <img src="../${item.image}" alt="${item.title}" style="width:40px;height:40px;object-fit:cover;margin-right:10px;">
          ${item.title}
        </td>
        <td class="text-end">$${(item.price * (item.qty || 1)).toFixed(2)}</td>
      </tr>
    `;
  });

  html += `
    <tr>
      <td class="text-start fw-bold">Subtotal:</td>
      <td class="text-end">$${cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0).toFixed(2)}</td>
    </tr>
    <tr>
      <td class="fw-bold">Shipping:</td>
      <td class="text-end">Free</td>
    </tr>
    <tr>
      <td class="fw-bold">Total:</td>
      <td class="text-end">$${cart.reduce((sum, item) => sum + item.price * (item.qty || 1), 0).toFixed(2)}</td>
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
  localStorage.removeItem("cart");
  alert(`Order placed successfully! Total: $${order.reduce((sum, item) => sum + item.price * (item.qty || 1), 0).toFixed(2)}`);
  window.location.href = "../home/home.html";
}