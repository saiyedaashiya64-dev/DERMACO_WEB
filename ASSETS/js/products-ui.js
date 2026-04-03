console.log("Products UI Loaded");

// ─── Render All Products ──────────────────────────────────────────────────────
function renderAllProducts() {
  const container = document.getElementById("products-container");
  if (!container) return;

  if (!window.PRODUCTS || Object.keys(window.PRODUCTS).length === 0) {
    setTimeout(renderAllProducts, 200);
    return;
  }

  renderFilteredProducts();
  initFilters();
}

// ─── Build a single card ──────────────────────────────────────────────────────
function buildCard(id, product) {
  const card = document.createElement("div");
  card.className = "catalog-card";
  card.innerHTML = `
    <div class="catalog-img-wrap">
      <img src="${product.image}" alt="${product.title}" class="catalog-img">
    </div>
    <div class="catalog-info">
      <h3 class="catalog-title">${product.title}</h3>
      <p class="catalog-size">${product.size}</p>
      <p class="catalog-price">₹${product.price}</p>
      <div class="catalog-actions">
        <button class="btn-view" onclick="openProduct('${id}')">View Details</button>
        <button class="btn-cart"
          data-id="${id}"
          data-name="${product.title}"
          data-price="${product.price}"
          data-image="${product.image}">
          <i class="fas fa-shopping-bag"></i> Add to Bag
        </button>
        <button class="btn-wish"
          data-id="${id}"
          data-name="${product.title}"
          data-price="${product.price}"
          data-image="${product.image}">
          <i class="fas fa-heart"></i>
        </button>
      </div>
    </div>
  `;
  return card;
}

// ─── Render Filtered Products ─────────────────────────────────────────────────
function renderFilteredProducts() {
  const container   = document.getElementById("products-container");
  const noResults   = document.getElementById("no-results");
  const countEl     = document.getElementById("filter-results-count");
  const clearBtn    = document.getElementById("filter-clear");
  if (!container) return;

  const search    = (document.getElementById("product-search")?.value || "").toLowerCase().trim();
  const skinType  = document.getElementById("filter-skintype")?.value  || "";
  const concern   = document.getElementById("filter-concern")?.value   || "";
  const priceRange= document.getElementById("filter-price")?.value     || "";
  const sort      = document.getElementById("filter-sort")?.value      || "";

  const hasFilter = search || skinType || concern || priceRange || sort;
  if (clearBtn) clearBtn.style.display = hasFilter ? "inline-flex" : "none";

  let entries = Object.entries(window.PRODUCTS);

  // ── Filter ──
  entries = entries.filter(([id, p]) => {
    // Search
    if (search && !p.title.toLowerCase().includes(search) &&
        !(p.description || "").toLowerCase().includes(search)) return false;

    // Skin type
    if (skinType) {
      const bf = (p.bestFor || p.bestfor || []).map(s => s.toLowerCase());
      if (!bf.some(s => s.includes(skinType.toLowerCase()))) return false;
    }

    // Concern
    if (concern) {
      const concerns = (p.concerns || []).map(c => c.toLowerCase());
      if (!concerns.some(c => c.includes(concern.toLowerCase()))) return false;
    }

    // Price
    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      if (p.price < min || p.price > max) return false;
    }

    return true;
  });

  // ── Sort ──
  if (sort === "price-asc")  entries.sort((a, b) => a[1].price - b[1].price);
  if (sort === "price-desc") entries.sort((a, b) => b[1].price - a[1].price);
  if (sort === "name-asc")   entries.sort((a, b) => a[1].title.localeCompare(b[1].title));

  // ── Render ──
  container.innerHTML = "";

  if (entries.length === 0) {
    container.style.display = "none";
    if (noResults) noResults.style.display = "block";
    if (countEl)   countEl.style.display   = "none";
    return;
  }

  container.style.display = "";
  if (noResults) noResults.style.display = "none";

  entries.forEach(([id, product]) => {
    container.appendChild(buildCard(id, product));
  });

  // Results count
  if (countEl) {
    const total = Object.keys(window.PRODUCTS).length;
    if (hasFilter && entries.length !== total) {
      countEl.textContent = `Showing ${entries.length} of ${total} products`;
      countEl.style.display = "block";
    } else {
      countEl.style.display = "none";
    }
  }
}

// ─── Init Filters ─────────────────────────────────────────────────────────────
function initFilters() {
  const ids = ["product-search", "filter-skintype", "filter-concern", "filter-price", "filter-sort"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const event = el.tagName === "INPUT" ? "input" : "change";
    el.addEventListener(event, renderFilteredProducts);
  });
}

// ─── Clear Filters ────────────────────────────────────────────────────────────
function clearFilters() {
  const el = id => document.getElementById(id);
  if (el("product-search"))  el("product-search").value  = "";
  if (el("filter-skintype")) el("filter-skintype").value = "";
  if (el("filter-concern"))  el("filter-concern").value  = "";
  if (el("filter-price"))    el("filter-price").value    = "";
  if (el("filter-sort"))     el("filter-sort").value     = "";
  renderFilteredProducts();
}

// ─── Add to Cart ──────────────────────────────────────────────────────────────
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-cart");
  if (!btn) return;

  const isLoggedIn = document.querySelector(".user-avatar");
  if (!isLoggedIn) {
    Swal.fire({
      icon: "warning",
      title: "Please Sign In",
      text: "You need to be logged in to add items to your bag.",
      confirmButtonColor: "#f4b400",
      confirmButtonText: "Sign In"
    }).then(result => {
      if (result.isConfirmed) window.location.href = "/dermaco_web/login.php";
    });
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

  const formData = new FormData();
  formData.append("product_id",    btn.dataset.id);
  formData.append("product_name",  btn.dataset.name);
  formData.append("product_price", btn.dataset.price);
  formData.append("product_image", btn.dataset.image);

  fetch("/dermaco_web/api/add-to-cart.php", {
    method: "POST",
    body: formData
  })
    .then(r => r.json())
    .then(data => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Bag';
      if (data.success) {
        if (typeof updateCartBadge === "function") updateCartBadge();
        Swal.fire({
          icon: "success",
          title: "Added to Bag!",
          text: btn.dataset.name + " has been added to your bag.",
          confirmButtonColor: "#f4b400",
          timer: 2000,
          showConfirmButton: false
        });
      } else if (data.message === "login_required") {
        window.location.href = "/dermaco_web/login.php";
      } else {
        Swal.fire("Error", data.message, "error");
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Bag';
      Swal.fire("Error", "Could not add to bag. Please try again.", "error");
    });
});

// ─── Add to Wishlist ──────────────────────────────────────────────────────────
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-wish");
  if (!btn) return;

  const isLoggedIn = document.querySelector(".user-avatar");
  if (!isLoggedIn) {
    Swal.fire({
      icon: "warning",
      title: "Please Sign In",
      text: "You need to be logged in to save items to your wishlist.",
      confirmButtonColor: "#f4b400",
      confirmButtonText: "Sign In"
    }).then(result => {
      if (result.isConfirmed) window.location.href = "/dermaco_web/login.php";
    });
    return;
  }

  const formData = new FormData();
  formData.append("product_id",    btn.dataset.id);
  formData.append("product_name",  btn.dataset.name);
  formData.append("product_price", btn.dataset.price);
  formData.append("product_image", btn.dataset.image);

  fetch("/dermaco_web/api/add-to-wishlist.php", {
    method: "POST",
    body: formData
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        btn.classList.add("wishlisted");
        btn.innerHTML = '<i class="fas fa-heart"></i>';
        Swal.fire({
          icon: "success",
          title: "Saved!",
          text: btn.dataset.name + " added to your wishlist.",
          confirmButtonColor: "#f4b400",
          timer: 2000,
          showConfirmButton: false
        });
      } else if (data.message === "login_required") {
        window.location.href = "/dermaco_web/login.php";
      }
    })
    .catch(() => {
      Swal.fire("Error", "Could not save to wishlist. Please try again.", "error");
    });
});