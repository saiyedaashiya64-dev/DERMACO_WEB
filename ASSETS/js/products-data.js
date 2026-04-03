window.PRODUCTS = {};
window.PRODUCTS_READY = false;
window._pendingTreatment = null;

fetch("/dermaco_web/products.json")
  .then(res => res.json())
  .then(data => {
    // Filter out inactive products — only show active ones on the store
    const filtered = {};
    Object.keys(data).forEach(key => {
      if (data[key].status !== 'inactive') {
        filtered[key] = data[key];
      }
    });

    window.PRODUCTS = filtered;
    window.PRODUCTS_READY = true;
    console.log("Products loaded:", Object.keys(window.PRODUCTS).length, "active products");

    if (window._pendingTreatment) {
      renderProductsByTreatment(window._pendingTreatment);
      window._pendingTreatment = null;
    }

    const container = document.getElementById("products-container");
    if (container) renderAllProducts();
  });