const Cart_products = [
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
];

function renderBillingDetails() {
  let paymentDetails = document.getElementById("payment-details");
  let paymentTable = document.querySelector("#payment-table tbody");
  
  if (!paymentTable) {
    console.error("Payment table tbody element not found");
    return;
  }

  let html = "";
  Cart_products.forEach((product, idx) => {
    html += `
          <tr>
              <td>
                  <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;"/>
                  <span>${product.title}</span>
              </td>
              <td>
                  $${product.price}
              </td>
          </tr>
          `;
  });

  paymentTable.innerHTML += html;

  const subtotal = Cart_products.reduce((prev, product) => prev + product.price, 0);
  
  paymentTable.innerHTML += `
              <tr>
                  <td>
                      Subtotal:
                  </td>
                  <td>
                  $${subtotal}
                  </td>
              </tr>
              <tr>
                  <td>
                      Shipping:
                  </td>
                  <td>
                  Free
                  </td>
              </tr>
              <tr>
                  <td>
                      Total:
                  </td>
                  <td>
                  $${subtotal}
                  </td>
              </tr>
  `;
}

// Make the function available globally
window.renderBillingDetails = renderBillingDetails;


