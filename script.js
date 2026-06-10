const products = [
  {
    id: "silk-gold",
    name: "Kanchipuram Gold Silk Saree",
    category: "Silk Sarees",
    price: 8999,
    image: "https://tse3.mm.bing.net/th/id/OIP.erOnXfVur0adgOKfqgVw2wHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "A lustrous festive silk saree with rich zari accents for weddings and grand celebrations."
  },
  {
    id: "silk-maroon",
    name: "Maroon Temple Border Silk Saree",
    category: "Silk Sarees",
    price: 9499,
    image: "https://images.pexels.com/photos/27575174/pexels-photo-27575174.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "A radiant silk drape with a traditional temple border and an heirloom finish."
  },
  {
    id: "cotton-green",
    name: "Handloom Cotton Green Saree",
    category: "Cotton Sarees",
    price: 3499,
    image: "https://assets0.mirraw.com/images/11531348/AS-20BC1665(2)_zoom.jpg?1684848107",
    description: "Breathable handloom cotton for graceful everyday wear and elegant daytime events."
  },
  {
    id: "cotton-indigo",
    name: "Indigo Woven Cotton Saree",
    category: "Cotton Sarees",
    price: 2899,
    image: "https://th.bing.com/th/id/R.210fcf84c2769fe2580112a461ab7794?rik=5XMathW1%2f%2f%2fBlA&riu=http%3a%2f%2f5.imimg.com%2fdata5%2fANDROID%2fDefault%2f2023%2f1%2fWQ%2fFN%2fQB%2f129769159%2fproduct-jpeg-1000x1000.jpg&ehk=2nQ2uaPgEZuFuv1pcKa%2bEgDOQTMpsm25IZIWtbqzUb0%3d&risl=&pid=ImgRaw&r=0",
    description: "A soft cotton weave with a calm indigo tone and subtle border detailing."
  },
  {
    id: "banarasi-red",
    name: "Banarasi Zari Royale Saree",
    category: "Banarasi Sarees",
    price: 12499,
    image: "https://sareewave.com/cdn/shop/files/AYN4004ROYALBLUE-5.jpg?v=1706176595",
    description: "Royal Banarasi artistry with opulent zari work for reception-ready styling."
  },
  {
    id: "banarasi-rose",
    name: "Rose Banarasi Brocade Saree",
    category: "Banarasi Sarees",
    price: 10999,
    image: "https://media.urbanwomania.com/wp-content/uploads/2024/01/Rose-Pink-Georgette-Silk-Banarasi-Saree-with-Meenakari.webp",
    description: "A brocade-rich Banarasi saree with soft rose tones and heritage woven motifs."
  },
  {
    id: "mysore-temple",
    name: "Mysore Silk Temple Gold Saree",
    category: "Mysore Silk Sarees",
    price: 7299,
    image: "https://images.pexels.com/photos/12006825/pexels-photo-12006825.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "Refined southern grace in a smooth Mysore silk drape with a polished glow."
  },
  {
    id: "mysore-emerald",
    name: "Emerald Mysore Silk Saree",
    category: "Mysore Silk Sarees",
    price: 8199,
    image: "https://tse2.mm.bing.net/th/id/OIP.qw5Cik5a0npmoAV8Da8NGAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "A jewel-toned Mysore silk saree made for festive evenings and temple visits."
  },
  {
    id: "georgette-pink",
    name: "Rose Georgette Party Saree",
    category: "Georgette Sarees",
    price: 5899,
    image: "https://i.pinimg.com/originals/ff/26/bf/ff26bf26abd7c05c10b9e46c40e84fb6.jpg",
    description: "A flowy georgette party saree with a soft fall and occasion-ready elegance."
  },
  {
    id: "georgette-champagne",
    name: "Champagne Georgette Saree",
    category: "Georgette Sarees",
    price: 6299,
    image: "https://tse3.mm.bing.net/th/id/OIP.h0K35SumLiNjh7hZUtH3AgHaKf?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "A light georgette drape with champagne shimmer and effortless movement."
  },
  {
    id: "designer-ruby",
    name: "Ruby Designer Bridal Saree",
    category: "Designer Sarees",
    price: 9999,
    image: "https://manyavar.scene7.com/is/image/manyavar/SB16047_422-WINE_401.5868_25-12-2024-16-14:650x900",
    description: "A statement designer saree with bridal-inspired details and a rich ruby mood."
  },
  {
    id: "designer-pearl",
    name: "Pearl Embellished Designer Saree",
    category: "Designer Sarees",
    price: 11499,
    image: "https://assets0.mirraw.com/images/10074402/1006_(3)_zoom.jpg?1647776442",
    description: "An embellished designer saree with polished pearl-like detailing for receptions."
  },
  {
    id: "linen-sunrise",
    name: "Sunrise Linen Saree",
    category: "Linen Sarees",
    price: 4599,
    image: "https://images.pexels.com/photos/29426609/pexels-photo-29426609.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "A crisp linen drape with warm festive tones and easy everyday refinement."
  },
  {
    id: "organza-ivory",
    name: "Ivory Organza Floral Saree",
    category: "Organza Sarees",
    price: 6899,
    image: "https://images.pexels.com/photos/17040015/pexels-photo-17040015.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "A delicate organza saree with floral charm for brunches, engagements, and celebrations."
  },
  {
    id: "chiffon-coral",
    name: "Coral Chiffon Saree",
    category: "Chiffon Sarees",
    price: 3999,
    image: "https://images.pexels.com/photos/19967777/pexels-photo-19967777.jpeg?auto=compress&cs=tinysrgb&w=700",
    description: "A breezy chiffon saree with a coral hue and a graceful, lightweight drape."
  }
];

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
  quickViewModal: document.querySelector("#quickViewModal"),
  quickViewContent: document.querySelector("#quickViewContent"),
  authBox: document.querySelector("#authBox"),
  authMessage: document.querySelector("#authMessage"),
  profileContent: document.querySelector("#profileContent")
};

const storeKeys = {
  users: "siriSareesUsers",
  currentUser: "siriSareesCurrentUser",
  wishlist: "siriSareesWishlist",
  cart: "siriSareesCart"
};

let wishlist = readStore(storeKeys.wishlist, []);
let cart = readStore(storeKeys.cart, []);
let visibleMoreCount = 6;

function readStore(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function productById(id) {
  return products.find((product) => product.id === id);
}

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
    <article class="product-card reveal visible" data-id="${product.id}">
      <button class="wishlist-btn ${wished ? "active" : ""}" type="button" data-wishlist="${product.id}" aria-label="${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist">
        <i class="${wished ? "fa-solid" : "fa-regular"} fa-heart"></i>
      </button>
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="price">${formatPrice(product.price)}</p>
        <div class="product-actions">
          <button class="quick-view" type="button" data-quick-view="${product.id}">Quick View</button>
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

function openQuickView(id) {
  const product = productById(id);
  if (!product) return;
  selectors.quickViewContent.innerHTML = `
    <div class="quick-view-layout">
      <img src="${product.image}" alt="${product.name}">
      <div>
        <p class="eyebrow">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="price">${formatPrice(product.price)}</p>
        <p class="quick-copy">${product.description}</p>
        <div class="product-actions">
          <button class="quick-view" type="button" data-wishlist="${product.id}">
            ${wishlist.includes(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
          <button class="add-cart" type="button" data-cart="${product.id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
  selectors.quickViewModal.classList.add("open");
  selectors.quickViewModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
}

function closeQuickView() {
  selectors.quickViewModal.classList.remove("open");
  selectors.quickViewModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panel-open");
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
  const quickButton = event.target.closest("[data-quick-view]");

  if (wishlistButton) toggleWishlist(wishlistButton.dataset.wishlist);
  if (cartButton) addToCart(cartButton.dataset.cart, cartButton);
  if (quickButton) openQuickView(quickButton.dataset.quickView);
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

[selectors.productGrid, selectors.categoryGrid, selectors.moreGrid, selectors.quickViewContent].forEach((container) => {
  container.addEventListener("click", handleProductClick);
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
document.querySelector("#closeQuickView").addEventListener("click", closeQuickView);
selectors.quickViewModal.addEventListener("click", (event) => {
  if (event.target === selectors.quickViewModal) closeQuickView();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePanels();
    closeQuickView();
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
