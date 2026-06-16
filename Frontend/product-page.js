const selectors = {
  header: document.querySelector("#siteHeader"),
  productDetailsContent: document.querySelector("#productDetailsContent"),
  cartCount: document.querySelector(".cart-count"),
  wishlistCount: document.querySelector(".wishlist-count"),
  panelOverlay: document.querySelector("#panelOverlay"),
  panels: document.querySelectorAll(".side-panel"),
  wishlistItems: document.querySelector("#wishlistItems"),
  wishlistEmpty: document.querySelector("#wishlistEmpty"),
  cartItems: document.querySelector("#cartItems"),
  cartEmpty: document.querySelector("#cartEmpty"),
  cartTotal: document.querySelector("#cartTotal"),
  authBox: document.querySelector("#authBox"),
  authMessage: document.querySelector("#authMessage"),
  profileContent: document.querySelector("#profileContent")
};

let wishlist = readStore(storeKeys.wishlist, []);
let cart = readStore(storeKeys.cart, []);
const productId = new URLSearchParams(window.location.search).get("id");
const currentProduct = productById(productId);
const isLocalNonFlaskServer = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  && window.location.port
  && window.location.port !== "5000";
const API_BASE = window.location.protocol === "file:" || isLocalNonFlaskServer
  ? "http://127.0.0.1:5000"
  : "";

function apiFetch(path, options) {
  return fetch(`${API_BASE}${path}`, options);
}

function getUsers() {
  return readStore(storeKeys.users, []);
}

function getCurrentUser() {
  const currentUserId = localStorage.getItem(storeKeys.currentUser);
  return getUsers().find((user) => String(user.id) === String(currentUserId)) || null;
}

function saveCurrentUser(user) {
  const users = getUsers();
  const nextUsers = users.some((item) => String(item.id) === String(user.id))
    ? users.map((item) => String(item.id) === String(user.id) ? user : item)
    : [...users, user];
  writeStore(storeKeys.users, nextUsers);
  localStorage.setItem(storeKeys.currentUser, String(user.id));
}

function normalizePhone(phone) {
  return phone.replace(/[^\d+]/g, "");
}

function isValidPhone(phone) {
  return /^(?:\+91[-\s]?)?[6-9]\d{9}$/.test(phone.trim()) || /^\+\d{10,15}$/.test(phone.trim());
}

function updateHeaderState() {
  selectors.header.classList.toggle("scrolled", window.scrollY > 18);
}

function updateBadge(badge, value) {
  badge.textContent = value;
  badge.classList.toggle("visible", value > 0);
}

function renderSpecifications(product) {
  return Object.entries(product.specifications).map(([label, value]) => `
    <div class="spec-row">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `).join("");
}

function relatedProductCard(product) {
  return `
    <a class="product-card related-product-card" href="product.html?id=${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <div class="rating-row">
          <span class="rating-badge">${product.rating} <i class="fa-solid fa-star"></i></span>
          <span>${product.reviewsCount} reviews</span>
        </div>
        <p class="price">${formatPrice(product.price)}</p>
        <p class="offer-line">${product.discount}</p>
      </div>
    </a>
  `;
}

function renderProductPage(product) {
  if (!product) {
    selectors.productDetailsContent.innerHTML = `
      <div class="empty-state visible">
        Product not found. Please return to shopping and choose a saree again.
      </div>
    `;
    return;
  }

  document.title = `${product.name} | Siri Saree Divine`;
  const wished = wishlist.includes(product.id);
  const gallery = productGallery(product);

  selectors.productDetailsContent.innerHTML = `
    <div class="detail-page">
      <div class="detail-gallery">
        <div class="thumbnail-list" aria-label="${product.name} image gallery">
          ${gallery.map((image, index) => `
            <button class="thumbnail-btn ${index === 0 ? "active" : ""}" type="button" data-gallery-image="${image}" aria-label="View image ${index + 1} of ${product.name}">
              <img src="${image}" alt="">
            </button>
          `).join("")}
        </div>
        <div class="main-product-image">
          <img id="activeProductImage" src="${product.image}" alt="${product.name}">
        </div>
        <div class="detail-action-bar">
          <button class="detail-cart-btn" type="button" data-cart="${product.id}">
            <i class="fa-solid fa-cart-shopping"></i>
            Add to Cart
          </button>
          <button class="buy-now-btn" type="button" data-buy-now="${product.id}">
            <i class="fa-solid fa-bolt"></i>
            Buy Now
          </button>
        </div>
      </div>
      <div class="detail-summary">
        <p class="product-category">${product.category}</p>
        <h1>${product.name}</h1>
        <div class="detail-rating-line">
          <span class="rating-badge">${product.rating} <i class="fa-solid fa-star"></i></span>
          <span>${product.reviewsCount} ratings and reviews</span>
        </div>
        <div class="detail-price-row">
          <strong>${formatPrice(product.price)}</strong>
          <span>${product.discount}</span>
        </div>
        <p class="offer-box"><i class="fa-solid fa-tag"></i> ${product.offer}</p>
        <button class="wishlist-inline ${wished ? "active" : ""}" type="button" data-wishlist="${product.id}">
          <i class="${wished ? "fa-solid" : "fa-regular"} fa-heart"></i>
          ${wished ? "Saved in Wishlist" : "Add to Wishlist"}
        </button>
        <div class="detail-card">
          <h3>Product Description</h3>
          <p>${product.description}</p>
        </div>
        <div class="detail-card">
          <h3>Product Highlights</h3>
          <ul class="highlight-list">
            ${product.highlights.map((item) => `<li><i class="fa-solid fa-check"></i>${item}</li>`).join("")}
          </ul>
        </div>
        <div class="detail-card">
          <h3>Product Information</h3>
          <p>${product.info}</p>
        </div>
        <div class="detail-card">
          <h3>Specifications</h3>
          <div class="spec-table">${renderSpecifications(product)}</div>
        </div>
        <div class="detail-card">
          <h3>Customer Reviews</h3>
          <div class="review-score">
            <strong>${product.rating}</strong>
            <span>${ratingStars(product.rating)}</span>
            <small>Based on ${product.reviewsCount} customer responses</small>
          </div>
          <div class="review-list">
            ${product.reviews.map((review) => `
              <article class="review-card">
                <div>
                  <span class="rating-badge">${review.rating} <i class="fa-solid fa-star"></i></span>
                  <strong>${review.name}</strong>
                </div>
                <p>${review.text}</p>
              </article>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
    <div class="related-block">
      <div class="section-heading">
        <p class="eyebrow">You May Also Like</p>
        <h2>Related Products</h2>
      </div>
      <div class="product-grid">${relatedProducts(product).map(relatedProductCard).join("")}</div>
    </div>
  `;
}

function openPanel(panelId) {
  selectors.panels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.classList.toggle("open", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });
  selectors.panelOverlay.classList.add("visible");
  selectors.panelOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
}

function closePanels() {
  selectors.panels.forEach((panel) => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  });
  selectors.panelOverlay.classList.remove("visible");
  selectors.panelOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panel-open");
}

function renderWishlist() {
  const wishlistProducts = wishlist.map(productById).filter(Boolean);
  selectors.wishlistItems.innerHTML = wishlistProducts.map((product) => `
    <div class="panel-item">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>${product.category}</p>
        <strong>${formatPrice(product.price)}</strong>
      </div>
      <button class="remove-btn" type="button" data-remove-wishlist="${product.id}" aria-label="Remove ${product.name} from wishlist">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join("");

  selectors.wishlistEmpty.classList.toggle("visible", wishlist.length === 0);
  updateBadge(selectors.wishlistCount, wishlist.length);
  writeStore(storeKeys.wishlist, wishlist);
}

function renderCart() {
  const cartItems = cart.map((item) => ({ ...item, product: productById(item.id) })).filter((item) => item.product);
  selectors.cartItems.innerHTML = cartItems.map(({ product, quantity }) => `
    <div class="panel-item cart-item">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <h3>${product.name}</h3>
        <p>Quantity: ${quantity}</p>
        <strong>${formatPrice(product.price * quantity)}</strong>
      </div>
      <button class="remove-btn" type="button" data-remove-cart="${product.id}" aria-label="Remove ${product.name} from cart">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join("");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => {
    const product = productById(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
  selectors.cartEmpty.classList.toggle("visible", cart.length === 0);
  selectors.cartTotal.textContent = formatPrice(totalAmount);
  updateBadge(selectors.cartCount, totalItems);
  writeStore(storeKeys.cart, cart);
}

function toggleWishlist(id) {
  wishlist = wishlist.includes(id)
    ? wishlist.filter((itemId) => itemId !== id)
    : [...wishlist, id];
  renderWishlist();
  renderProductPage(currentProduct);
}

function addToCart(id, button) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  renderCart();
  if (!button) return;
  button.innerHTML = '<i class="fa-solid fa-check"></i> Added';
  button.classList.add("added");
  setTimeout(() => {
    button.innerHTML = '<i class="fa-solid fa-cart-shopping"></i> Add to Cart';
    button.classList.remove("added");
  }, 1200);
}

function buyNow(id) {
  addToCart(id);
  openPanel("cartPanel");
}

function renderProfile() {
  const user = getCurrentUser();
  selectors.authBox.style.display = user ? "none" : "block";

  const authToken = localStorage.getItem("ssdAuthToken");
  const currentUserId = localStorage.getItem(storeKeys.currentUser);
  if (!user && authToken && currentUserId) {
    loadCurrentUserFromServer(currentUserId);
  }

  if (!user) {
    selectors.profileContent.innerHTML = "";
    return;
  }

  const photoMarkup = user.photo
    ? `<img src="${user.photo}" alt="${user.fullName} profile photo">`
    : `<div class="profile-initial" aria-hidden="true">${user.fullName.charAt(0).toUpperCase()}</div>`;
  const orders = user.orders || [];

  selectors.profileContent.innerHTML = `
    <div class="profile-card">
      ${photoMarkup}
      <h3>${user.fullName}</h3>
      <p>${user.email}</p>
      <div class="profile-actions">
        <button class="checkout-btn" type="button" id="logoutUser">Logout</button>
      </div>
    </div>
    <div class="detail-list">
      <p><span>Email Address</span>${user.email}</p>
      <p><span>Phone Number</span>${user.phone}</p>
      <p><span>Gender</span>${user.gender}</p>
      <p><span>Address</span>${user.address}</p>
    </div>
    <div class="orders-box">
      <h3>Order History</h3>
      ${orders.length ? orders.map((order) => `
        <div class="order-row">
          <span>${order.id}</span>
          <strong>${order.items} item${order.items === 1 ? "" : "s"} - ${formatPrice(order.total)}</strong>
          <em>${order.date}</em>
        </div>
      `).join("") : '<p class="order-empty">No orders placed yet.</p>'}
    </div>
  `;
}

async function loadCurrentUserFromServer(userId) {
  try {
    const res = await apiFetch(`/api/users/${encodeURIComponent(userId)}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.user) return;

    saveCurrentUser(data.user);
    renderProfile();
  } catch (error) {
    console.error("Unable to refresh profile from Flask API.", error);
  }
}

function setAuthMessage(message, isError = false) {
  selectors.authMessage.textContent = message;
  selectors.authMessage.style.color = isError ? "#9D2722" : "var(--deep-gold)";
}

async function registerUser(form) {
  const formData = new FormData(form);
  const payload = {
    fullName: (formData.get("fullName") || "").trim(),
    email: (formData.get("email") || "").trim().toLowerCase(),
    phone: normalizePhone((formData.get("phone") || "").trim()),
    gender: (formData.get("gender") || "").trim(),
    address: (formData.get("address") || "").trim(),
    photo: (formData.get("photo") || "").trim(),
    password: (formData.get("password") || "").trim()
  };

  if (!payload.fullName || !payload.email || !payload.phone || !payload.gender || !payload.address || !payload.password) {
    setAuthMessage("Please fill all required profile details.", true);
    return;
  }
  if (!isValidPhone(payload.phone)) {
    setAuthMessage("Please enter a valid phone number.", true);
    return;
  }

  const res = await apiFetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    setAuthMessage(data.message || "Registration failed.", true);
    return;
  }

  form.reset();
  if (data.user && data.token) {
    saveCurrentUser(data.user);
    localStorage.setItem("ssdAuthToken", data.token);
    setAuthMessage("");
    renderProfile();
    return;
  }

  setAuthMessage("Account created successfully. Please login.");
}

async function loginUser(form) {
  const formData = new FormData(form);
  const payload = {
    email: (formData.get("email") || "").trim().toLowerCase(),
    phone: normalizePhone((formData.get("phone") || "").trim()),
    password: (formData.get("password") || "").trim()
  };

  if (!payload.email || !payload.phone || !payload.password) {
    setAuthMessage("Please enter email, phone and password.", true);
    return;
  }
  if (!isValidPhone(payload.phone)) {
    setAuthMessage("Please enter a valid phone number.", true);
    return;
  }

  const res = await apiFetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    setAuthMessage(data.message || "Login failed.", true);
    return;
  }

  localStorage.setItem(storeKeys.currentUser, String(data.user.id));
  localStorage.setItem("ssdAuthToken", data.token);
  saveCurrentUser(data.user);

  form.reset();
  setAuthMessage("");
  renderProfile();
}

function checkout() {
  if (cart.length === 0) return;
  const user = getCurrentUser();
  if (!user) {
    closePanels();
    renderProfile();
    openPanel("profilePanel");
    setAuthMessage("Please login or register before checkout.", true);
    return;
  }

  const total = cart.reduce((sum, item) => {
    const product = productById(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
  const items = cart.reduce((sum, item) => sum + item.quantity, 0);
  const order = {
    id: `#SSD${Date.now().toString().slice(-6)}`,
    items,
    total,
    date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  };

  saveCurrentUser({ ...user, orders: [order, ...(user.orders || [])] });
  cart = [];
  renderCart();
  renderProfile();
  openPanel("profilePanel");
}

selectors.productDetailsContent.addEventListener("click", (event) => {
  const wishlistButton = event.target.closest("[data-wishlist]");
  const cartButton = event.target.closest("[data-cart]");
  const buyNowButton = event.target.closest("[data-buy-now]");
  const galleryButton = event.target.closest("[data-gallery-image]");

  if (wishlistButton) toggleWishlist(wishlistButton.dataset.wishlist);
  if (cartButton) addToCart(cartButton.dataset.cart, cartButton);
  if (buyNowButton) buyNow(buyNowButton.dataset.buyNow);
  if (galleryButton) {
    const activeImage = document.querySelector("#activeProductImage");
    if (activeImage) activeImage.src = galleryButton.dataset.galleryImage;
    document.querySelectorAll(".thumbnail-btn").forEach((button) => button.classList.toggle("active", button === galleryButton));
  }
});

document.querySelector("#openProfile").addEventListener("click", () => {
  renderProfile();
  openPanel("profilePanel");
});
document.querySelector("#openWishlist").addEventListener("click", () => {
  renderWishlist();
  openPanel("wishlistPanel");
});
document.querySelector("#openCart").addEventListener("click", () => {
  renderCart();
  openPanel("cartPanel");
});

document.querySelectorAll("[data-close-panel]").forEach((button) => {
  button.addEventListener("click", closePanels);
});

selectors.panelOverlay.addEventListener("click", closePanels);

selectors.wishlistItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-wishlist]");
  if (!removeButton) return;
  wishlist = wishlist.filter((id) => id !== removeButton.dataset.removeWishlist);
  renderWishlist();
  renderProductPage(currentProduct);
});

selectors.cartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-cart]");
  if (!removeButton) return;
  cart = cart.filter((item) => item.id !== removeButton.dataset.removeCart);
  renderCart();
});

document.querySelectorAll(".auth-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".auth-tab").forEach((item) => item.classList.toggle("active", item === tab));
    document.querySelectorAll(".auth-form").forEach((form) => form.classList.toggle("active", form.id === `${tab.dataset.authTab}Form`));
    setAuthMessage("");
  });
});

document.querySelector("#registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  registerUser(event.currentTarget);
});

document.querySelector("#loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  loginUser(event.currentTarget);
});

selectors.profileContent.addEventListener("click", (event) => {
  if (!event.target.closest("#logoutUser")) return;
  localStorage.removeItem(storeKeys.currentUser);
  localStorage.removeItem("ssdAuthToken");
  renderProfile();
});

document.querySelector("#checkoutBtn").addEventListener("click", checkout);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
});

window.addEventListener("scroll", updateHeaderState);
renderProductPage(currentProduct);
renderWishlist();
renderCart();
renderProfile();
updateHeaderState();
