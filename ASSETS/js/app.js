// ─── Contact Form Submit ─────────────────────────────────────────────────────
document.addEventListener("submit", function (e) {
  if (e.target.id !== "contactForm") return;

  e.preventDefault();

  const btn = e.target.querySelector("button[type='submit']");

  // ── Validate date & time slot before doing anything ──
  const apptDate = document.getElementById('appointment_date')?.value;
  const apptTime = document.getElementById('appointment_time')?.value;

  if (!apptDate) {
    Swal.fire('Missing Info', 'Please select an appointment date.', 'warning');
    return;
  }
  if (!apptTime) {
    Swal.fire('Missing Info', 'Please select a time slot.', 'warning');
    return;
  }

  btn.disabled = true;
  btn.innerText = "Sending...";

  const formData = new FormData(e.target);

  fetch("/dermaco_web/api/save-appointment.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.text())
    .then(data => {
      if (data.trim() === "success") {
        Swal.fire({
          icon: "success",
          title: "Consultation Booked!",
          text: "We've received your request and will get back to you within 24 hours.",
          confirmButtonColor: "#f4b400",
          confirmButtonText: "Great, thanks!"
        });

        // Reset form + slot UI
        e.target.reset();
        document.getElementById('slot-section').style.display = 'none';
        document.getElementById('slot-container').innerHTML = '';
        document.getElementById('slot-message').style.display = 'none';

      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong",
          text: data,
          confirmButtonColor: "#f4b400"
        });
      }
      btn.disabled = false;
      btn.innerText = "Request Consultation";
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Please check your connection and try again.",
        confirmButtonColor: "#f4b400"
      });
      btn.disabled = false;
      btn.innerText = "Request Consultation";
    });
});

// ─── Date picker → load slots ────────────────────────────────────────────────
document.addEventListener('change', function (e) {
  if (!e.target || e.target.id !== 'appointment_date') return;

  const date          = e.target.value;
  const slotSection   = document.getElementById('slot-section');
  const slotContainer = document.getElementById('slot-container');
  const slotMessage   = document.getElementById('slot-message');
  const timeInput     = document.getElementById('appointment_time');

  // Reset state
  slotContainer.innerHTML = '<span class="text-muted small">Loading slots...</span>';
  slotSection.style.display = 'block';
  slotMessage.style.display = 'none';
  slotMessage.textContent = '';
  timeInput.value = '';

  // Block past dates client-side
  const today = new Date().toISOString().split('T')[0];
  if (date < today) {
    slotContainer.innerHTML = '';
    slotMessage.textContent = 'Please select a future date.';
    slotMessage.style.display = 'block';
    return;
  }

  fetch(`/dermaco_web/api/get-slots.php?date=${date}`)
    .then(r => r.json())
    .then(data => {
      slotContainer.innerHTML = '';

      if (data.closed) {
        slotMessage.textContent = 'We are closed on Sundays. Please choose another date.';
        slotMessage.style.display = 'block';
        return;
      }

      if (!data.slots || data.slots.length === 0) {
        slotMessage.textContent = 'No slots available for this date.';
        slotMessage.style.display = 'block';
        return;
      }

      data.slots.forEach(slot => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = slot.label;
        btn.className = 'btn btn-sm ' + (slot.available ? 'btn-outline-success' : 'btn-outline-danger');
        btn.disabled = !slot.available;

        if (slot.available) {
          btn.addEventListener('click', function () {
            document.querySelectorAll('#slot-container .btn').forEach(b => {
              b.classList.remove('btn-success');
              b.classList.add('btn-outline-success');
            });
            btn.classList.remove('btn-outline-success');
            btn.classList.add('btn-success');
            timeInput.value = slot.time;
          });
        }

        slotContainer.appendChild(btn);
      });
    })
    .catch(() => {
      slotContainer.innerHTML = '';
      slotMessage.textContent = 'Could not load slots. Please try again.';
      slotMessage.style.display = 'block';
    });
});

// ─── Set min date — works for both normal load and SPA page inject ────────────
function initDatePicker() {
  const dateInput = document.getElementById('appointment_date');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }
}

// ─── Load Cart Page ───────────────────────────────────────────────────────────
function loadCart() {
  fetch("/dermaco_web/api/get-cart.php")
    .then(r => r.json())
    .then(data => {
      const itemsDiv  = document.getElementById("cart-items");
      const summaryDiv = document.getElementById("cart-summary");

      if (!itemsDiv) return;

      if (!data.success) {
        window.location.href = "/dermaco_web/login.php";
        return;
      }

      if (data.items.length === 0) {
    itemsDiv.innerHTML = `
      <div class="cart-empty">
        <i class="fas fa-shopping-bag"></i>
        <p>Your bag is empty.</p>
        <button class="btn-primary" onclick="loadPage('PAGES/products.html')">
          Shop Now
        </button>
      </div>`;
    summaryDiv.style.display = "none";  // ← add this line
    return;
  }

      itemsDiv.innerHTML = "";
      data.items.forEach(item => {
        itemsDiv.innerHTML += `
          <div class="cart-item" id="cart-item-${item.product_id}">
            <img src="${item.product_image}" alt="${item.product_name}">
            <div class="cart-item-info">
              <h4>${item.product_name}</h4>
              <p class="cart-item-price">₹${item.product_price}</p>
              <p class="cart-item-qty">Qty: ${item.quantity}</p>
            </div>
            <div class="cart-item-right">
              <p class="cart-item-total">₹${(item.product_price * item.quantity).toFixed(2)}</p>
              <button class="btn-remove" data-id="${item.product_id}">
                <i class="fas fa-trash"></i> Remove
              </button>
            </div>
          </div>`;
      });

      // Show summary
      const delivery = data.total >= 399 ? "FREE" : "₹50";
      const finalTotal = data.total >= 399 ? data.total : data.total + 50;

document.getElementById("cart-subtotal").textContent = "₹" + data.total.toFixed(2);
document.getElementById("cart-delivery").textContent = delivery;
document.getElementById("cart-total").textContent    = "₹" + finalTotal.toFixed(2);

// ── Free delivery progress bar ──
const threshold = 399;
const bar       = document.getElementById("free-delivery-bar");
const fill      = document.getElementById("fdb-fill");
const text      = document.getElementById("fdb-text");

if (bar) {
  if (data.total >= threshold) {
    fill.style.width = "100%";
    text.innerHTML   = '🎉 You got <strong>FREE delivery!</strong>';
  } else {
    const remaining = threshold - data.total;
    const pct       = Math.min((data.total / threshold) * 100, 100);
    fill.style.width = pct + "%";
    text.innerHTML   = 'Add <strong>₹' + remaining.toFixed(0) + '</strong> more for FREE delivery!';
  }
}
      summaryDiv.style.display = "block";

      // Checkout button
      document.getElementById("btn-checkout").onclick = () => {
        loadPage("PAGES/checkout.html");
      };
    });
}

// ─── Remove from cart ─────────────────────────────────────────────────────────
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-remove");
  if (!btn) return;

  const productId = btn.dataset.id;

  const formData = new FormData();
  formData.append("product_id", productId);

  fetch("/dermaco_web/api/remove-from-cart.php", {
    method: "POST",
    body: formData
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        loadCart();
        updateCartBadge(); // ← add this
      }
    });
});

// ─── Load Wishlist Page ───────────────────────────────────────────────────────
function loadWishlist() {
  fetch("/dermaco_web/api/get-wishlist.php")
    .then(r => r.json())
    .then(data => {
      const div = document.getElementById("wishlist-items");
      if (!div) return;

      if (!data.success) {
        window.location.href = "/dermaco_web/login.php";
        return;
      }

      if (data.items.length === 0) {
        div.innerHTML = `
          <div class="cart-empty">
            <i class="fas fa-heart"></i>
            <p>Your wishlist is empty.</p>
            <button class="btn-primary" onclick="loadPage('PAGES/products.html')">
              Shop Now
            </button>
          </div>`;
        return;
      }

      div.innerHTML = "";
      data.items.forEach(item => {
        div.innerHTML += `
          <div class="cart-item" id="wish-item-${item.product_id}">
            <img src="${item.product_image}" alt="${item.product_name}">
            <div class="cart-item-info">
              <h4>${item.product_name}</h4>
              <p class="cart-item-price">₹${parseFloat(item.product_price).toFixed(2)}</p>
            </div>
            <div class="cart-item-right">
              <button class="btn-checkout" style="width:auto; padding: 10px 18px; margin-top:0;"
                onclick="moveToCart('${item.product_id}', '${item.product_name}', ${item.product_price}, '${item.product_image}')">
                <i class="fas fa-shopping-bag"></i> Add to Bag
              </button>
              <button class="btn-remove btn-remove-wish" data-id="${item.product_id}">
                <i class="fas fa-trash"></i> Remove
              </button>
            </div>
          </div>`;
      });
    });
}

// ─── Remove from Wishlist ─────────────────────────────────────────────────────
document.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-remove-wish");
  if (!btn) return;

  const productId = btn.dataset.id;
  const formData = new FormData();
  formData.append("product_id", productId);

  fetch("/dermaco_web/api/remove-from-wishlist.php", {
    method: "POST",
    body: formData
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) loadWishlist();
    });
});

// ─── Move from Wishlist to Cart ───────────────────────────────────────────────
function moveToCart(id, name, price, image) {
  const formData = new FormData();
  formData.append("product_id",    id);
  formData.append("product_name",  name);
  formData.append("product_price", price);
  formData.append("product_image", image);

  fetch("/dermaco_web/api/add-to-cart.php", {
    method: "POST",
    body: formData
  })
    .then(r => r.json())
    .then(data => {
      if (data.success) {
        updateCartBadge(); // ← add this
        Swal.fire({
          icon: "success",
          title: "Added to Bag!",
          text: name + " has been moved to your bag.",
          confirmButtonColor: "#f4b400",
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
}

// Run on initial load
document.addEventListener('DOMContentLoaded', initDatePicker);

// Run whenever spa-init.js injects a new page — adjust event name if yours differs
document.addEventListener('spa:pageLoaded', initDatePicker);

// ─── Load Profile Page ────────────────────────────────────────────────────────
function loadProfile() {
  fetch("/dermaco_web/api/get-profile.php")
    .then(r => r.json())
    .then(data => {
      if (!data.success) {
        window.location.href = "/dermaco_web/login.php";
        return;
      }

      document.getElementById("profile-name").textContent        = data.name;
      document.getElementById("profile-email").textContent       = data.email;
      document.getElementById("profile-sidebar-name").textContent = data.name;
      document.getElementById("profile-sidebar-email").textContent = data.email;
      document.getElementById("profile-avatar-letter").textContent = data.name.charAt(0).toUpperCase();

      // Tab switching
      document.querySelectorAll(".profile-nav li").forEach(li => {
        li.addEventListener("click", function () {
          document.querySelectorAll(".profile-nav li").forEach(l => l.classList.remove("active"));
          document.querySelectorAll(".profile-tab").forEach(t => t.classList.remove("active"));
          this.classList.add("active");
          document.getElementById("tab-" + this.dataset.tab).classList.add("active");
        });
      });

      // Change password
      document.getElementById("btn-save-password").addEventListener("click", function () {
        const current = document.getElementById("current-password").value;
        const newPass = document.getElementById("new-password").value;
        const confirm = document.getElementById("confirm-password").value;

        const formData = new FormData();
        formData.append("current_password", current);
        formData.append("new_password",     newPass);
        formData.append("confirm_password", confirm);

        const btn = this;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating...';

        fetch("/dermaco_web/api/change-password.php", {
          method: "POST",
          body: formData
        })
          .then(r => r.json())
          .then(res => {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-save"></i> Update Password';

            if (res.success) {
              Swal.fire({
                icon: "success",
                title: "Password Updated!",
                text: res.message,
                confirmButtonColor: "#f4b400",
                timer: 2000,
                showConfirmButton: false
              });
              document.getElementById("current-password").value = "";
              document.getElementById("new-password").value     = "";
              document.getElementById("confirm-password").value = "";
            } else {
              Swal.fire("Error", res.message, "error");
            }
          });
      });
    });
}
// ─── Load Checkout Page ───────────────────────────────────────────────────────
function loadCheckout() {
  fetch("/dermaco_web/api/get-cart.php")
    .then(r => r.json())
    .then(data => {
      if (!data.success) {
        window.location.href = "/dermaco_web/login.php";
        return;
      }

      if (data.items.length === 0) {
        loadPage("PAGES/cart.html");
        return;
      }

      const itemsDiv = document.getElementById("co-items");
      if (!itemsDiv) return;

      // Pre-fill user info
      fetch("/dermaco_web/api/get-profile.php")
        .then(r => r.json())
        .then(profile => {
          if (profile.success) {
            document.getElementById("co-name").value  = profile.name;
            document.getElementById("co-email").value = profile.email;
          }
        });

      // Render items
      itemsDiv.innerHTML = "";
      data.items.forEach(item => {
        itemsDiv.innerHTML += `
          <div class="co-item">
            <img src="${item.product_image}" alt="${item.product_name}">
            <div class="co-item-info">
              <p>${item.product_name}</p>
              <small>Qty: ${item.quantity}</small>
            </div>
            <span>₹${(item.product_price * item.quantity).toFixed(2)}</span>
          </div>`;
      });

      const delivery   = data.total >= 399 ? "FREE" : "₹50";
      const finalTotal = data.total >= 399 ? data.total : data.total + 50;

      document.getElementById("co-subtotal").textContent = "₹" + data.total.toFixed(2);
      document.getElementById("co-delivery").textContent = delivery;
      document.getElementById("co-total").textContent    = "₹" + finalTotal.toFixed(2);

      // Place order
      document.getElementById("btn-place-order").addEventListener("click", function () {
        const name    = document.getElementById("co-name").value.trim();
        const email   = document.getElementById("co-email").value.trim();
        const phone   = document.getElementById("co-phone").value.trim();
        const address = document.getElementById("co-address").value.trim();
        const city    = document.getElementById("co-city").value.trim();
        const pincode = document.getElementById("co-pincode").value.trim();

        if (!name || !email || !phone || !address || !city || !pincode) {
          Swal.fire("Missing Info", "Please fill in all delivery details.", "warning");
          return;
        }

        const btn = this;
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing Order...';

        const formData = new FormData();
        formData.append("name",    name);
        formData.append("email",   email);
        formData.append("phone",   phone);
        formData.append("address", address);
        formData.append("city",    city);
        formData.append("pincode", pincode);

        fetch("/dermaco_web/api/checkout.php", {
          method: "POST",
          body: formData
        })
          .then(r => r.json())
          .then(res => {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-lock"></i> Place Order';

            if (res.success) {
              updateCartBadge(); // ← add this (cart is now empty after order)
              // Hide checkout layout, show success
              document.getElementById("checkout-layout").style.display = "none";
              const successDiv = document.getElementById("order-success");
              successDiv.style.display = "block";

              let itemsHtml = "";
              res.items.forEach(item => {
                itemsHtml += `
                  <div class="co-item">
                    <img src="${item.product_image}" alt="${item.product_name}">
                    <div class="co-item-info">
                      <p>${item.product_name}</p>
                      <small>Qty: ${item.quantity}</small>
                    </div>
                    <span>₹${(item.product_price * item.quantity).toFixed(2)}</span>
                  </div>`;
              });

              document.getElementById("order-success-details").innerHTML = `
                <p><strong>Order ID:</strong> #${res.order_id}</p>
                <p><strong>Delivering to:</strong> ${res.address}, ${res.city} — ${res.pincode}</p>
                <p><strong>Payment:</strong> Cash on Delivery</p>
                <div style="margin-top:16px">${itemsHtml}</div>
                <div class="summary-row" style="margin-top:16px">
                  <span>Delivery</span><span>${res.delivery}</span>
                </div>
                <div class="summary-row total">
                  <span>Total</span><span>₹${parseFloat(res.total).toFixed(2)}</span>
                </div>`;
            } else if (res.message === "login_required") {
              window.location.href = "/dermaco_web/login.php";
            } else {
              Swal.fire("Error", res.message, "error");
            }
          })
          .catch(() => {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-lock"></i> Place Order';
            Swal.fire("Error", "Something went wrong. Please try again.", "error");
          });
      });
    });
}
// ─── Load Orders Page ─────────────────────────────────────────────────────────
function loadOrders() {
  fetch("/dermaco_web/api/get-orders.php")
    .then(r => r.json())
    .then(data => {
      const div = document.getElementById("orders-list");
      if (!div) return;

      if (!data.success) {
        window.location.href = "/dermaco_web/login.php";
        return;
      }

      if (data.orders.length === 0) {
        div.innerHTML = `
          <div class="cart-empty">
            <i class="fas fa-box-open"></i>
            <p>You have no orders yet.</p>
            <button class="btn-primary" onclick="loadPage('PAGES/products.html')">
              Shop Now
            </button>
          </div>`;
        return;
      }

      div.innerHTML = "";
      data.orders.forEach(order => {
        const date = new Date(order.created_at).toLocaleDateString('en-IN', {
          day: 'numeric', month: 'long', year: 'numeric'
        });

        const statusColor = {
          'pending':   '#f4b400',
          'confirmed': '#28a745',
          'cancelled': '#e6005c',
          'delivered': '#17a2b8'
        }[order.status] || '#888';

        let itemsHtml = "";
        order.items.forEach(item => {
          itemsHtml += `
            <div class="co-item">
              <img src="${item.product_image}" alt="${item.product_name}">
              <div class="co-item-info">
                <p>${item.product_name}</p>
                <small>Qty: ${item.quantity}</small>
              </div>
              <span>₹${(item.product_price * item.quantity).toFixed(2)}</span>
            </div>`;
        });

        div.innerHTML += `
          <div class="order-card">
            <div class="order-card-header">
              <div>
                <span class="order-id">Order #${order.id}</span>
                <span class="order-date">${date}</span>
              </div>
              <span class="order-status" style="background:${statusColor}20; color:${statusColor}">
                ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div class="order-card-body">
              ${itemsHtml}
            </div>
            <div class="order-card-footer">
              <span><i class="fas fa-map-marker-alt"></i> ${order.address}, ${order.city}</span>
              <span><i class="fas fa-wallet"></i> ${order.payment_method}</span>
              <strong>Total: ₹${parseFloat(order.total).toFixed(2)}</strong>
            </div>
          </div>`;
      });
    });
}
// ─── Cart Badge ───────────────────────────────────────────────
function updateCartBadge() {
  fetch('/dermaco_web/api/get-cart.php')
    .then(res => res.json())
    .then(data => {
      const badge = document.getElementById('cart-count-badge');
      if (!badge) return;
      if (data.success && data.items && data.items.length > 0) {
        const totalQty = data.items.reduce((sum, item) => sum + parseInt(item.quantity || 1), 0);
        badge.textContent = totalQty > 99 ? '99+' : totalQty;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    })
    .catch(() => {
      const badge = document.getElementById('cart-count-badge');
      if (badge) badge.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
// ─────────────────────────────────────────────────────────────