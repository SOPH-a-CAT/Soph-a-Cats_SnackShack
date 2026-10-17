const categories = [
  { id: 'chips', title: 'Chips', color: '#ffd93d' },
  { id: 'candy', title: 'Candy', color: '#95db45' },
];

const menu = [
  { id: 'doritos-cool-ranch', category: 'chips', brand: 'Doritos', flavor: 'Cool Ranch', name: 'Doritos Cool Ranch', price: 1.75, image: 'products/doritos.png', alt: 'Blue bag of Doritos Cool Ranch tortilla chips', color: '#52c7ff' },
  { id: 'cheetos-flamin-hot', category: 'chips', brand: 'Cheetos', flavor: 'Flamin’ Hot Crunchy', name: 'Cheetos Flamin’ Hot Crunchy', price: 1.75, image: 'products/hot_cheeto.png', alt: 'Red and orange bag of Cheetos Flamin’ Hot Crunchy snacks', color: '#ff734d' },
  { id: 'takis-fuego', category: 'chips', brand: 'Takis', flavor: 'Fuego', name: 'Takis Fuego', price: 1.75, image: 'products/takis.png', alt: 'Purple bag of Takis Fuego rolled tortilla chips', color: '#b8a1ff' },
  { id: 'kitkat-milk-chocolate', category: 'candy', brand: 'KitKat', flavor: 'Milk Chocolate', name: 'KitKat Milk Chocolate', price: 1.5, image: 'products/kitkat.png', alt: 'Red KitKat milk chocolate wafer bar package', color: '#ff8b8b' },
  { id: 'reeses-peanut-butter-cups', category: 'candy', brand: 'Reese’s', flavor: 'Peanut Butter Cups', name: 'Reese’s Peanut Butter Cups', price: 1.5, image: 'products/reeses.png', alt: 'Orange Reese’s peanut butter cups package', color: '#ffb347' },
  { id: 'skittles-original', category: 'candy', brand: 'Skittles', flavor: 'Original', name: 'Skittles Original', price: 1.25, image: 'products/skittles.png', alt: 'Red bag of Skittles Original fruit candy', color: '#95db45' },
  { id: 'sour-patch-kids-original', category: 'candy', brand: 'Sour Patch Kids', flavor: 'Original', name: 'Sour Patch Kids Original', price: 1.5, image: 'products/sour_patch_kids.png', alt: 'Yellow bag of Sour Patch Kids candy', color: '#ffd93d' },
  { id: 'trolli-sour-brite-crawlers', category: 'candy', brand: 'Trolli', flavor: 'Sour Brite Crawlers', name: 'Trolli Sour Brite Crawlers', price: 1.5, image: 'products/trolli.png', alt: 'Black bag of Trolli Sour Brite Crawlers gummy candy', color: '#52c7ff' },
];

const productId = new URLSearchParams(location.search).get('product') || '';
const activeProduct = menu.find((item) => item.id === productId);

let storedCart = {};
try {
  storedCart = JSON.parse(localStorage.getItem('snack-shack-cart') || '{}');
} catch {
  localStorage.removeItem('snack-shack-cart');
}
const availableItemIds = new Set(menu.map((item) => item.id));
const cart = new Map(Object.entries(storedCart).filter(([id]) => availableItemIds.has(id)));

const menuGrid = document.querySelector('#menuGrid');
const cartButton = document.querySelector('#cartButton');
const cartPanel = document.querySelector('#cartPanel');
const closeCartButton = document.querySelector('#closeCart');
const scrim = document.querySelector('#scrim');
const cartItems = document.querySelector('#cartItems');
const cartCount = document.querySelector('#cartCount');
const cartTotal = document.querySelector('#cartTotal');
const checkoutButton = document.querySelector('#checkoutButton');
const checkoutDialog = document.querySelector('#checkoutDialog');
const closeCheckout = document.querySelector('#closeCheckout');
const checkoutForm = document.querySelector('#checkoutForm');
const confirmation = document.querySelector('#confirmation');
const doneButton = document.querySelector('#doneButton');
const toast = document.querySelector('#toast');
let lastFocusedElement;
let toastTimer;

function money(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

function renderMenu() {
  if (!menuGrid) return;
  menuGrid.innerHTML = categories.map((category) => `
    <section class="menu-category" id="category-${category.id}" aria-labelledby="category-${category.id}-title">
      <div class="category-heading" style="--category-color:${category.color}">
        <h3 id="category-${category.id}-title">${category.title}</h3>
      </div>
      <div class="menu-grid">
        ${menu.filter((item) => item.category === category.id).map((item) => `
          <article class="menu-card">
            <a class="product-picture" href="?product=${item.id}" style="--item-color:${item.color}" aria-label="View ${item.name} details">
              <img src="${item.image}" alt="${item.alt}" loading="lazy" />
            </a>
            <div class="product-copy">
              <h4>${item.brand}</h4>
              <p>${item.flavor}</p>
              <div class="product-footer">
                <span class="price">${money(item.price)}</span>
                <button class="add-button" type="button" data-add="${item.id}" aria-label="Add ${item.name} to cart">+</button>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `).join('');
}

function renderProductPage(item) {
  document.body.classList.add('product-route');
  document.title = `${item.name} — The Snack Shack`;
  document.querySelector('main').innerHTML = `
    <section class="product-detail" style="--item-color:${item.color}" aria-labelledby="productTitle">
      <a class="detail-back" href="./#menu"><span aria-hidden="true">←</span> Back to menu</a>
      <div class="detail-grid">
        <div class="detail-gallery">
          <div class="detail-image-stage"><img src="${item.image}" alt="${item.alt}" /></div>
        </div>
        <div class="detail-info">
          <p class="detail-kicker">${categories.find((category) => category.id === item.category).title}</p>
          <h1 id="productTitle">${item.brand}<br /><span>${item.flavor}</span></h1>
          <p class="detail-price">${money(item.price)}</p>
          <div class="detail-size"><strong>Size</strong><span>Single package</span></div>
          <div class="detail-buy">
            <div><strong>Quantity</strong><div class="detail-quantity" aria-label="Quantity for ${item.name}"><button id="detailDecrease" type="button" aria-label="Decrease quantity">−</button><strong id="detailQuantity">1</strong><button id="detailIncrease" type="button" aria-label="Increase quantity">+</button></div></div>
            <button class="detail-add" id="detailAdd" type="button">Add to cart</button>
          </div>
        </div>
      </div>
    </section>`;

  let detailQuantity = 1;
  const quantityLabel = document.querySelector('#detailQuantity');

  document.querySelector('#detailDecrease').addEventListener('click', () => {
    detailQuantity = Math.max(1, detailQuantity - 1);
    quantityLabel.textContent = detailQuantity;
  });
  document.querySelector('#detailIncrease').addEventListener('click', () => {
    detailQuantity = Math.min(12, detailQuantity + 1);
    quantityLabel.textContent = detailQuantity;
  });
  document.querySelector('#detailAdd').addEventListener('click', () => {
    changeQuantity(item.id, detailQuantity);
    showToast(`${detailQuantity} ${item.name} ${detailQuantity === 1 ? 'was' : 'were'} added to your cart.`);
  });
}

function saveCart() {
  localStorage.setItem('snack-shack-cart', JSON.stringify(Object.fromEntries(cart)));
}

function totals() {
  return menu.reduce((acc, item) => {
    const quantity = Number(cart.get(item.id) || 0);
    acc.count += quantity;
    acc.cost += item.price * quantity;
    return acc;
  }, { count: 0, cost: 0 });
}

function renderCart() {
  const { count, cost } = totals();
  cartCount.textContent = count;
  cartCount.setAttribute('aria-label', `${count} item${count === 1 ? '' : 's'}`);
  cartTotal.textContent = money(cost);
  checkoutButton.disabled = count === 0;

  const selected = menu.filter((item) => Number(cart.get(item.id)) > 0);
  if (!selected.length) {
    cartItems.innerHTML = '<div class="empty-cart"><h3>Cart is empty.</h3></div>';
    return;
  }

  cartItems.innerHTML = selected.map((item) => {
    const quantity = Number(cart.get(item.id));
    return `
      <article class="cart-row">
        <div class="cart-row-icon" style="--item-color:${item.color}"><img src="${item.image}" alt="" /></div>
        <div><h3>${item.name}</h3><p>${money(item.price)} each</p></div>
        <div class="quantity-control" aria-label="Quantity for ${item.name}">
          <button type="button" data-decrease="${item.id}" aria-label="Remove one ${item.name}">−</button>
          <strong>${quantity}</strong>
          <button type="button" data-increase="${item.id}" aria-label="Add one ${item.name}">+</button>
        </div>
      </article>
    `;
  }).join('');
}

function changeQuantity(id, amount) {
  const next = Math.max(0, Number(cart.get(id) || 0) + amount);
  if (next === 0) cart.delete(id);
  else cart.set(id, next);
  saveCart();
  renderCart();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1800);
}

function openCart() {
  lastFocusedElement = document.activeElement;
  cartPanel.classList.add('open');
  cartPanel.setAttribute('aria-hidden', 'false');
  cartButton.setAttribute('aria-expanded', 'true');
  scrim.hidden = false;
  document.body.classList.add('locked');
  closeCartButton.focus();
}

function closeCart() {
  cartPanel.classList.remove('open');
  cartPanel.setAttribute('aria-hidden', 'true');
  cartButton.setAttribute('aria-expanded', 'false');
  scrim.hidden = true;
  document.body.classList.remove('locked');
  lastFocusedElement?.focus();
}

menuGrid?.addEventListener('click', (event) => {
  const button = event.target.closest('[data-add]');
  if (!button) return;
  const item = menu.find((entry) => entry.id === button.dataset.add);
  changeQuantity(item.id, 1);
  showToast(`${item.name} was added to your cart.`);
});

cartItems.addEventListener('click', (event) => {
  const increase = event.target.closest('[data-increase]');
  const decrease = event.target.closest('[data-decrease]');
  if (increase) changeQuantity(increase.dataset.increase, 1);
  if (decrease) changeQuantity(decrease.dataset.decrease, -1);
});

cartButton.addEventListener('click', openCart);
closeCartButton.addEventListener('click', closeCart);
scrim.addEventListener('click', closeCart);

checkoutButton.addEventListener('click', () => {
  if (totals().count === 0) return;
  closeCart();
  checkoutForm.hidden = false;
  confirmation.hidden = true;
  checkoutDialog.showModal();
  document.querySelector('#studentName').focus();
});

closeCheckout.addEventListener('click', () => checkoutDialog.close());
checkoutDialog.addEventListener('click', (event) => {
  if (event.target === checkoutDialog) checkoutDialog.close();
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(checkoutForm);
  const firstName = String(formData.get('studentName')).trim();
  const { count, cost } = totals();
  const code = `SNACK-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  document.querySelector('#confirmationText').textContent = `${firstName}, your ${count} item${count === 1 ? '' : 's'} (${money(cost)}) will be waiting at the Student Center East Hallway, and payment will be collected when you arrive.`;
  document.querySelector('#orderCode').textContent = `Pickup code: ${code}`;
  checkoutForm.hidden = true;
  confirmation.hidden = false;
  cart.clear();
  saveCart();
  renderCart();
});

doneButton.addEventListener('click', () => {
  checkoutDialog.close();
  checkoutForm.reset();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cartPanel.classList.contains('open')) closeCart();
});

renderMenu();
renderCart();
if (activeProduct) renderProductPage(activeProduct);
else if (productId) location.replace('./#menu');
