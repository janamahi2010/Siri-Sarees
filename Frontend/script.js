const selectors = {
  header: document.querySelector("#siteHeader"),
  mainNav: document.querySelector("#mainNav"),
  menuToggle: document.querySelector(".menu-toggle"),
  backTop: document.querySelector(".back-top"),
  productGrid: document.querySelector("#productGrid"),
  emptyState: document.querySelector("#emptyState"),
  searchInput: document.querySelector("#searchInput"),
  searchForm: document.querySelector("#searchForm"),
  searchSummary: document.querySelector("#searchSummary"),
  cartCount: document.querySelector(".cart-count"),
  wishlistCount: document.querySelector(".wishlist-count"),
  subscriptionForm: document.querySelector("#subscriptionForm"),
  subscriptionPhone: document.querySelector("#subscriptionPhone"),
  formMessage: document.querySelector(".form-message"),
  panelOverlay: document.querySelector("#panelOverlay"),
  panels: document.querySelectorAll(".side-panel"),
  wishlistItems: document.querySelector("#wishlistItems"),
  wishlistEmpty: document.querySelector("#wishlistEmpty"),
  cartItems: document.querySelector("#cartItems"),
  cartEmpty: document.querySelector("#cartEmpty"),
  cartTotal: document.querySelector("#cartTotal"),
  categoryResults: document.querySelector("#categoryResults"),
  categoryGrid: document.querySelector("#categoryGrid"),
  categoryTitle: document.querySelector("#categoryTitle"),
  categoryLoading: document.querySelector("#categoryLoading"),
  moreCollections: document.querySelector("#moreCollections"),
  moreGrid: document.querySelector("#moreGrid"),
  moreLoading: document.querySelector("#moreLoading"),
  loadMoreProducts: document.querySelector("#loadMoreProducts"),
  authBox: document.querySelector("#authBox"),
  authMessage: document.querySelector("#authMessage"),
  profileContent: document.querySelector("#profileContent")
};

let wishlist = readStore(storeKeys.wishlist, []);
let cart = readStore(storeKeys.cart, []);
let visibleMoreCount = 6;
function getUsers() {
  return readStore(storeKeys.users, []);
}

function getCurrentUser() {
  const currentUserId = localStorage.getItem(storeKeys.currentUser);
  return getUsers().find((user) => user.id === currentUserId) || null;
}

function saveCurrentUser(user) {
  const users = getUsers();
  const nextUsers = users.some((item) => item.id === user.id)
    ? users.map((item) => item.id === user.id ? user : item)
    : [...users, user];
  writeStore(storeKeys.users, nextUsers);
  localStorage.setItem(storeKeys.currentUser, user.id);
}

function normalizePhone(phone) {
  return phone.replace(/[^\d+]/g, "");
}

function isValidPhone(phone) {
  return /^(?:\+91[-\s]?)?[6-9]\d{9}$/.test(phone.trim()) || /^\+\d{10,15}$/.test(phone.trim());
}

function updateHeaderState() {
  selectors.header.classList.toggle("scrolled", window.scrollY > 18);
  selectors.backTop.classList.toggle("visible", window.scrollY > 520);
}

function updateBadge(badge, value) {
  badge.textContent = value;
  badge.classList.toggle("visible", value > 0);
}

function productCard(product) {
  const wished = wishlist.includes(product.id);
  return `
    <article class="product-card reveal visible" data-id="${product.id}" data-product-link="${product.id}" tabindex="0" role="link" aria-label="Open ${product.name} details">
      <button class="wishlist-btn ${wished ? "active" : ""}" type="button" data-wishlist="${product.id}" aria-label="${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist">
        <i class="${wished ? "fa-solid" : "fa-regular"} fa-heart"></i>
      </button>
      <a class="product-image-link" href="product.html?id=${product.id}" aria-label="Open ${product.name} details">
        <img src="${product.image}" alt="${product.name}">
      </a>
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="rating-row">
          <span class="rating-badge">${product.rating} <i class="fa-solid fa-star"></i></span>
          <span>${product.reviewsCount} reviews</span>
        </div>
        <p class="price">${formatPrice(product.price)}</p>
        <p class="offer-line">${product.discount}</p>
        <div class="product-actions">
          <a class="detail-link" href="product.html?id=${product.id}" data-detail-link>View Details</a>
          <button class="add-cart" type="button" data-cart="${product.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderProductGrid(container, list) {
  container.innerHTML = list.map(productCard).join("");
}

function renderTrending(list = products.slice(0, 6)) {
  renderProductGrid(selectors.productGrid, list);
  selectors.emptyState.classList.toggle("visible", list.length === 0);
}

function filterProducts() {
  const query = selectors.searchInput.value.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const searchableText = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return searchableText.includes(query);
  });

  renderTrending(query ? filtered : products.slice(0, 6));
  selectors.searchSummary.textContent = query
    ? `${filtered.length} result${filtered.length === 1 ? "" : "s"} for "${selectors.searchInput.value.trim()}"`
    : "";
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

function toggleLoading(loader, isLoading) {
  loader.classList.toggle("visible", isLoading);
}

function openCategory(category) {
  selectors.categoryResults.classList.add("open");
  selectors.categoryTitle.textContent = category;
  selectors.categoryGrid.innerHTML = "";
  toggleLoading(selectors.categoryLoading, true);
  selectors.categoryResults.scrollIntoView({ behavior: "smooth", block: "start" });

  setTimeout(() => {
    const categoryProducts = products.filter((product) => product.category === category);
    renderProductGrid(selectors.categoryGrid, categoryProducts);
    toggleLoading(selectors.categoryLoading, false);
  }, 350);
}

function closeCategory() {
  selectors.categoryResults.classList.remove("open");
  document.querySelector("#categories").scrollIntoView({ behavior: "smooth", block: "start" });
}

function openMoreCollections() {
  visibleMoreCount = 6;
  selectors.moreCollections.classList.add("open");
  selectors.moreGrid.innerHTML = "";
  toggleLoading(selectors.moreLoading, true);
  selectors.moreCollections.scrollIntoView({ behavior: "smooth", block: "start" });

  setTimeout(() => {
    renderMoreCollections();
    toggleLoading(selectors.moreLoading, false);
  }, 350);
}

function renderMoreCollections() {
  const list = products.slice(6, 6 + visibleMoreCount);
  renderProductGrid(selectors.moreGrid, list);
  selectors.loadMoreProducts.style.display = 6 + visibleMoreCount >= products.length ? "none" : "inline-flex";
}

function closeMoreCollections() {
  selectors.moreCollections.classList.remove("open");
  document.querySelector("#trending").scrollIntoView({ behavior: "smooth", block: "start" });
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

function rerenderOpenProductSurfaces() {
  filterProducts();
  if (selectors.categoryResults.classList.contains("open")) {
    const category = selectors.categoryTitle.textContent;
    renderProductGrid(selectors.categoryGrid, products.filter((product) => product.category === category));
  }
  if (selectors.moreCollections.classList.contains("open")) renderMoreCollections();
}

function toggleWishlist(id) {
  wishlist = wishlist.includes(id)
    ? wishlist.filter((itemId) => itemId !== id)
    : [...wishlist, id];
  renderWishlist();
  rerenderOpenProductSurfaces();
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
  button.textContent = "Added";
  button.classList.add("added");
  setTimeout(() => {
    button.textContent = "Add to Cart";
    button.classList.remove("added");
  }, 1200);
}

function renderProfile() {
  const user = getCurrentUser();
  selectors.authBox.style.display = user ? "none" : "block";

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

function setAuthMessage(message, isError = false) {
  selectors.authMessage.textContent = message;
  selectors.authMessage.style.color = isError ? "#9D2722" : "var(--deep-gold)";
}

function registerUser(form) {
  const formData = new FormData(form);
  const user = {
    id: window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : `ssd-${Date.now()}`,
    fullName: formData.get("fullName").trim(),
    email: formData.get("email").trim().toLowerCase(),
    phone: normalizePhone(formData.get("phone").trim()),
    gender: formData.get("gender"),
    address: formData.get("address").trim(),
    photo: formData.get("photo").trim(),
    orders: []
  };

  if (!user.fullName || !user.email || !user.phone || !user.gender || !user.address) {
    setAuthMessage("Please fill all required profile details.", true);
    return;
  }
  if (!isValidPhone(user.phone)) {
    setAuthMessage("Please enter a valid phone number.", true);
    return;
  }
  if (getUsers().some((item) => item.email === user.email)) {
    setAuthMessage("An account with this email already exists.", true);
    return;
  }

  saveCurrentUser(user);
  form.reset();
  setAuthMessage("");
  renderProfile();
}

function loginUser(form) {
  const formData = new FormData(form);
  const email = formData.get("email").trim().toLowerCase();
  const phone = normalizePhone(formData.get("phone").trim());
  const user = getUsers().find((item) => item.email === email && item.phone === phone);

  if (!user) {
    setAuthMessage("No matching account found. Register first to create your profile.", true);
    return;
  }

  localStorage.setItem(storeKeys.currentUser, user.id);
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

function handleProductClick(event) {
  const wishlistButton = event.target.closest("[data-wishlist]");
  const cartButton = event.target.closest("[data-cart]");
  const detailLink = event.target.closest("[data-detail-link]");
  const productLink = event.target.closest("[data-product-link]");

  if (wishlistButton) {
    toggleWishlist(wishlistButton.dataset.wishlist);
    return;
  }
  if (cartButton) {
    addToCart(cartButton.dataset.cart, cartButton);
    return;
  }
  if (detailLink) return;
  if (productLink) {
    window.location.href = `product.html?id=${productLink.dataset.productLink}`;
  }
}

selectors.menuToggle.addEventListener("click", () => {
  const isOpen = selectors.mainNav.classList.toggle("open");
  selectors.menuToggle.setAttribute("aria-expanded", String(isOpen));
  selectors.menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

selectors.mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    selectors.mainNav.classList.remove("open");
    selectors.menuToggle.setAttribute("aria-expanded", "false");
    selectors.menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => openCategory(card.dataset.category));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCategory(card.dataset.category);
    }
  });
});

[selectors.productGrid, selectors.categoryGrid, selectors.moreGrid].forEach((container) => {
  container.addEventListener("click", handleProductClick);
  container.addEventListener("keydown", (event) => {
    const productLink = event.target.closest("[data-product-link]");
    const nativeControl = event.target.closest("button, a");
    if ((event.key === "Enter" || event.key === " ") && productLink && !nativeControl) {
      event.preventDefault();
      handleProductClick(event);
    }
  });
});

selectors.wishlistItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-wishlist]");
  if (!removeButton) return;
  wishlist = wishlist.filter((id) => id !== removeButton.dataset.removeWishlist);
  renderWishlist();
  rerenderOpenProductSurfaces();
});

selectors.cartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-cart]");
  if (!removeButton) return;
  cart = cart.filter((item) => item.id !== removeButton.dataset.removeCart);
  renderCart();
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
document.querySelector("#closeCategory").addEventListener("click", closeCategory);
document.querySelector("#closeCategoryX").addEventListener("click", closeCategory);
document.querySelector("#viewMoreTrending").addEventListener("click", openMoreCollections);
document.querySelector("#backToTrending").addEventListener("click", closeMoreCollections);
document.querySelector("#closeMoreCollections").addEventListener("click", closeMoreCollections);
selectors.loadMoreProducts.addEventListener("click", () => {
  visibleMoreCount += 3;
  renderMoreCollections();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePanels();
  }
});

selectors.searchForm.addEventListener("submit", (event) => event.preventDefault());
selectors.searchInput.addEventListener("input", filterProducts);

selectors.subscriptionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const phone = normalizePhone(selectors.subscriptionPhone.value.trim());
  selectors.formMessage.classList.remove("success", "error");

  if (!isValidPhone(phone)) {
    selectors.formMessage.textContent = "Please enter a valid mobile number for collection alerts.";
    selectors.formMessage.classList.add("error");
    return;
  }

  selectors.formMessage.textContent = "You will receive Siri Saree Divine new collection alerts on your phone.";
  selectors.formMessage.classList.add("success");
  selectors.subscriptionPhone.value = "";
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
  renderProfile();
});

document.querySelector("#checkoutBtn").addEventListener("click", checkout);

selectors.backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
window.addEventListener("scroll", updateHeaderState);
renderTrending();
renderWishlist();
renderCart();
renderProfile();
updateHeaderState();

