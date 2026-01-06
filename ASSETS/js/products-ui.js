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

document.addEventListener("click", function (e) {

  const card = e.target.closest(".product-card");
  if (!card) return;

  const productId = card.dataset.productId;
  const product = PRODUCTS[productId];

  if (!product) {
    console.warn("Product not found:", productId);
    return;
  }

  const overlay = document.querySelector(".product-detail-overlay");
  if (!overlay) return;

  // Map popup elements
  const img = document.getElementById("popupProductImage");
  const title = document.getElementById("popupProductTitle");
  const desc = document.getElementById("popupProductDescription");

  const ingredientsList = document.getElementById("popupIngredients");
  const bestForList = document.getElementById("popupBestFor");
  const concernsList = document.getElementById("popupConcerns");

  // Fill content
  img.src = product.image;
  img.alt = product.title;

  title.textContent = product.title;
  desc.textContent = product.description;

  // Ingredients
  ingredientsList.innerHTML = "";
  product.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ingredientsList.appendChild(li);
  });

  // Best for
  bestForList.innerHTML = "";
  product.bestFor.forEach(item => {
    const li = document.createElement("li");
    li.textContent = "✔ " + item;
    bestForList.appendChild(li);
  });

  // Concerns
  concernsList.innerHTML = "";
  product.concerns.forEach(item => {
    const li = document.createElement("li");
    li.textContent = "✔ " + item;
    concernsList.appendChild(li);
  });

  // Show popup
  overlay.style.display = "flex";
  document.body.style.overflow = "hidden";
});
document.querySelector(".product-close")?.addEventListener("click", () => {
  document.querySelector(".product-detail-overlay").style.display = "none";
  document.body.style.overflow = "";
});

