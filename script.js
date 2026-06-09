const products = [
  {
    id: "silk-gold",
    name: "Kanchipuram Gold Silk Saree",
    category: "Silk Sarees",
    price: 8999,
    image: "https://images.pexels.com/photos/15181109/pexels-photo-15181109.jpeg?auto=compress&cs=tinysrgb&w=700"
  },
  {
    id: "cotton-green",
    name: "Handloom Cotton Green Saree",
    category: "Cotton Sarees",
    price: 3499,
    image: "https://images.pexels.com/photos/35212992/pexels-photo-35212992.jpeg?auto=compress&cs=tinysrgb&w=700"
  },
  {
    id: "banarasi-red",
    name: "Banarasi Zari Royale Saree",
    category: "Banarasi Sarees",
    price: 12499,
    image: "https://images.pexels.com/photos/19891846/pexels-photo-19891846.jpeg?auto=compress&cs=tinysrgb&w=700"
  },
  {
    id: "mysore-temple",
    name: "Mysore Silk Temple Gold Saree",
    category: "Mysore Silk Sarees",
    price: 7299,
    image: "https://images.pexels.com/photos/12006825/pexels-photo-12006825.jpeg?auto=compress&cs=tinysrgb&w=700"
  },
  {
    id: "georgette-pink",
    name: "Rose Georgette Party Saree",
    category: "Georgette Sarees",
    price: 5899,
    image: "https://images.pexels.com/photos/9418955/pexels-photo-9418955.jpeg?auto=compress&cs=tinysrgb&w=700"
  },
  {
    id: "designer-ruby",
    name: "Ruby Designer Bridal Saree",
    category: "Designer Sarees",
    price: 9999,
    image: "https://images.pexels.com/photos/9419184/pexels-photo-9419184.jpeg?auto=compress&cs=tinysrgb&w=700"
  }
];

const header = document.querySelector("#siteHeader");
const mainNav = document.querySelector("#mainNav");
const menuToggle = document.querySelector(".menu-toggle");
const backTop = document.querySelector(".back-top");
const productGrid = document.querySelector("#productGrid");
const emptyState = document.querySelector("#emptyState");
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");
const searchSummary = document.querySelector("#searchSummary");
const cartCount = document.querySelector(".cart-count");
const wishlistCount = document.querySelector(".wishlist-count");
const newsletterForm = document.querySelector(".newsletter-form");
const formMessage = document.querySelector(".form-message");
const panelOverlay = document.querySelector("#panelOverlay");
const panels = document.querySelectorAll(".side-panel");
const wishlistItems = document.querySelector("#wishlistItems");
const wishlistEmpty = document.querySelector("#wishlistEmpty");
const cartItems = document.querySelector("#cartItems");
const cartEmpty = document.querySelector("#cartEmpty");
const cartTotal = document.querySelector("#cartTotal");

let wishlist = ["banarasi-red", "mysore-temple"];
let cart = [{ id: "silk-gold", quantity: 1 }];

function formatPrice(value) {
  return `Rs. ${value.toLocaleString("en-IN")}`;
}

function productById(id) {
  return products.find((product) => product.id === id);
}

function updateHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 18);
  backTop.classList.toggle("visible", window.scrollY > 520);
}

function updateBadge(badge, value) {
  badge.textContent = value;
  badge.classList.toggle("visible", value > 0);
}

function renderProducts(list = products) {
  productGrid.innerHTML = list.map((product) => `
    <article class="product-card reveal visible" data-id="${product.id}">
      <button class="wishlist-btn ${wishlist.includes(product.id) ? "active" : ""}" type="button" data-wishlist="${product.id}" aria-label="Add ${product.name} to wishlist">
        <i class="${wishlist.includes(product.id) ? "fa-solid" : "fa-regular"} fa-heart"></i>
      </button>
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <p class="product-category">${product.category}</p>
        <h3>${product.name}</h3>
        <p class="price">${formatPrice(product.price)}</p>
        <button class="add-cart" type="button" data-cart="${product.id}">Add to Cart</button>
      </div>
    </article>
  `).join("");

  emptyState.classList.toggle("visible", list.length === 0);
}

function filterProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = products.filter((product) => {
    const searchableText = `${product.name} ${product.category}`.toLowerCase();
    return searchableText.includes(query);
  });

  renderProducts(filtered);
  searchSummary.textContent = query
    ? `${filtered.length} result${filtered.length === 1 ? "" : "s"} for "${searchInput.value.trim()}"`
    : "";
}

function openPanel(panelId) {
  panels.forEach((panel) => {
    const isActive = panel.id === panelId;
    panel.classList.toggle("open", isActive);
    panel.setAttribute("aria-hidden", String(!isActive));
  });
  panelOverlay.classList.add("visible");
  panelOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("panel-open");
}

function closePanels() {
  panels.forEach((panel) => {
    panel.classList.remove("open");
    panel.setAttribute("aria-hidden", "true");
  });
  panelOverlay.classList.remove("visible");
  panelOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("panel-open");
}

function renderWishlist() {
  wishlistItems.innerHTML = wishlist.map((id) => {
    const product = productById(id);
    return `
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
    `;
  }).join("");

  wishlistEmpty.classList.toggle("visible", wishlist.length === 0);
  updateBadge(wishlistCount, wishlist.length);
}

function renderCart() {
  cartItems.innerHTML = cart.map((item) => {
    const product = productById(item.id);
    return `
      <div class="panel-item cart-item">
        <img src="${product.image}" alt="${product.name}">
        <div>
          <h3>${product.name}</h3>
          <p>Quantity: ${item.quantity}</p>
          <strong>${formatPrice(product.price * item.quantity)}</strong>
        </div>
        <button class="remove-btn" type="button" data-remove-cart="${product.id}" aria-label="Remove ${product.name} from cart">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `;
  }).join("");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + productById(item.id).price * item.quantity, 0);
  cartEmpty.classList.toggle("visible", cart.length === 0);
  cartTotal.textContent = formatPrice(totalAmount);
  updateBadge(cartCount, totalItems);
}

function toggleWishlist(id) {
  wishlist = wishlist.includes(id)
    ? wishlist.filter((itemId) => itemId !== id)
    : [...wishlist, id];
  renderWishlist();
  filterProducts();
}

function addToCart(id, button) {
  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  renderCart();
  button.textContent = "Added";
  button.classList.add("added");

  setTimeout(() => {
    button.textContent = "Add to Cart";
    button.classList.remove("added");
  }, 1200);
}

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

productGrid.addEventListener("click", (event) => {
  const wishlistButton = event.target.closest("[data-wishlist]");
  const cartButton = event.target.closest("[data-cart]");

  if (wishlistButton) {
    toggleWishlist(wishlistButton.dataset.wishlist);
  }

  if (cartButton) {
    addToCart(cartButton.dataset.cart, cartButton);
  }
});

wishlistItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-wishlist]");
  if (!removeButton) return;
  wishlist = wishlist.filter((id) => id !== removeButton.dataset.removeWishlist);
  renderWishlist();
  filterProducts();
});

cartItems.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-remove-cart]");
  if (!removeButton) return;
  cart = cart.filter((item) => item.id !== removeButton.dataset.removeCart);
  renderCart();
});

document.querySelector("#openProfile").addEventListener("click", () => openPanel("profilePanel"));
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

panelOverlay.addEventListener("click", closePanels);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePanels();
});

searchForm.addEventListener("submit", (event) => event.preventDefault());
searchInput.addEventListener("input", filterProducts);

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = newsletterForm.querySelector("input");
  formMessage.textContent = "Thank you for subscribing to Siri Sarees Divine.";
  emailInput.value = "";
});

backTop.addEventListener("click", () => {
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
renderProducts();
renderWishlist();
renderCart();
updateHeaderState();
