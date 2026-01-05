// ===============================
// Render products by treatment
// ===============================
function renderProductsByTreatment(treatment) {

  const slider = document.getElementById("productSlider");
  if (!slider || typeof PRODUCTS === "undefined") return;

  slider.innerHTML = "";

  for (const id in PRODUCTS) {
    const product = PRODUCTS[id];

    if (!product.treatments?.includes(treatment)) continue;

    const card = document.createElement("div");
    card.className = "product-card";
    card.dataset.productId = id;

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <h4>${product.title}</h4>
      <p>${product.description.substring(0, 70)}...</p>
      <span class="product-size">${product.size}</span>
    `;

    slider.appendChild(card);
  }
}
