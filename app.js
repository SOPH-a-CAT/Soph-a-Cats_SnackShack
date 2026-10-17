const categories = [
  { id: 'chips', title: 'Chips & Crunch', color: '#ffd93d' },
  { id: 'cookies', title: 'Cookies & Pastries', color: '#ff8bbb' },
  { id: 'candy', title: 'Candy', color: '#95db45' },
  { id: 'drinks', title: 'Cold Drinks', color: '#52c7ff' },
];

const menu = [
  { id: 'doritos-cool-ranch', category: 'chips', brand: 'Doritos®', flavor: 'Cool Ranch®', name: 'Doritos® Cool Ranch®', price: 1.75, image: 'products/doritos-cool-ranch.jpg', backImage: 'products/doritos-cool-ranch-back.jpg', alt: 'Blue bag of Doritos Cool Ranch tortilla chips', color: '#52c7ff' },
  { id: 'doritos-nacho-cheese', category: 'chips', brand: 'Doritos®', flavor: 'Nacho Cheese', name: 'Doritos® Nacho Cheese', price: 1.75, image: 'products/doritos-nacho-cheese.jpg', backImage: 'products/doritos-nacho-cheese-back.jpg', alt: 'Red bag of Doritos Nacho Cheese tortilla chips', color: '#ff8d4d' },
  { id: 'cheetos-crunchy', category: 'chips', brand: 'CHEETOS®', flavor: 'Crunchy Cheese', name: 'CHEETOS® Crunchy Cheese', price: 1.75, image: 'products/cheetos-crunchy.jpg', backImage: 'products/cheetos-crunchy-back.jpg', alt: 'Orange bag of CHEETOS Crunchy cheese snacks', color: '#ffb347' },
  { id: 'lays-classic', category: 'chips', brand: "LAY'S®", flavor: 'Classic', name: "LAY'S® Classic", price: 1.5, image: 'products/lays-classic.jpg', backImage: 'products/lays-classic-back.jpg', alt: "Yellow bag of LAY'S Classic potato chips", color: '#ffd93d' },
  { id: 'oreo-original', category: 'cookies', brand: 'OREO®', flavor: 'Original', name: 'OREO® Original', price: 1.25, image: 'products/oreo-original.jpg', backImage: 'products/oreo-original-back.jpg', alt: 'Blue package of original OREO sandwich cookies', color: '#b8a1ff' },
  { id: 'poptarts-frosted-strawberry', category: 'cookies', brand: 'Pop-Tarts®', flavor: 'Frosted Strawberry', name: 'Pop-Tarts® Frosted Strawberry', price: 1.5, image: 'products/poptarts-frosted-strawberry.jpg', backImage: 'products/poptarts-frosted-strawberry-back.jpg', alt: 'Blue box of Frosted Strawberry Pop-Tarts', color: '#ff8bbb' },
  { id: 'poptarts-brown-sugar-cinnamon', category: 'cookies', brand: 'Pop-Tarts®', flavor: 'Brown Sugar Cinnamon', name: 'Pop-Tarts® Brown Sugar Cinnamon', price: 1.5, image: 'products/poptarts-brown-sugar-cinnamon.jpg', backImage: 'products/poptarts-brown-sugar-cinnamon-back.jpg', alt: 'Box of Frosted Brown Sugar Cinnamon Pop-Tarts', color: '#e7b37a' },
  { id: 'mms-milk-chocolate', category: 'candy', brand: "M&M'S®", flavor: 'Milk Chocolate', name: "M&M'S® Milk Chocolate", price: 1.5, image: 'products/mms-milk-chocolate.jpg', backImage: 'products/mms-milk-chocolate-back.jpg', alt: "Brown bag of M&M'S milk chocolate candy", color: '#ffd93d' },
  { id: 'mms-peanut', category: 'candy', brand: "M&M'S®", flavor: 'Peanut', name: "M&M'S® Peanut", price: 1.5, image: 'products/mms-peanut.jpg', backImage: 'products/mms-peanut-back.jpg', alt: "Yellow bag of M&M'S Peanut candy", color: '#ffe66d' },
  { id: 'skittles-original', category: 'candy', brand: 'SKITTLES®', flavor: 'Original', name: 'SKITTLES® Original', price: 1.25, image: 'products/skittles-original.jpg', backImage: 'products/skittles-original-back.jpg', alt: 'Red bag of Original SKITTLES fruity candy', color: '#95db45' },
  { id: 'skittles-wild-berry', category: 'candy', brand: 'SKITTLES®', flavor: 'Wild Berry', name: 'SKITTLES® Wild Berry', price: 1.25, image: 'products/skittles-wild-berry.jpg', backImage: 'products/skittles-wild-berry-back.jpg', alt: 'Purple bag of SKITTLES Wild Berry candy', color: '#b8a1ff' },
  { id: 'gatorade-cool-blue', category: 'drinks', brand: 'Gatorade®', flavor: 'Cool Blue', name: 'Gatorade® Cool Blue', price: 2, image: 'products/gatorade-cool-blue.jpg', backImage: 'products/gatorade-cool-blue-back.jpg', alt: 'Bottle of Gatorade Cool Blue sports drink', color: '#52c7ff' },
  { id: 'gatorade-fruit-punch', category: 'drinks', brand: 'Gatorade®', flavor: 'Fruit Punch', name: 'Gatorade® Fruit Punch', price: 2, image: 'products/gatorade-fruit-punch.jpg', backImage: 'products/gatorade-fruit-punch-back.jpg', alt: 'Bottle of Gatorade Fruit Punch sports drink', color: '#ff8b8b' },
  { id: 'gatorade-lemon-lime', category: 'drinks', brand: 'Gatorade®', flavor: 'Lemon-Lime', name: 'Gatorade® Lemon-Lime', price: 2, image: 'products/gatorade-lemon-lime.jpg', backImage: 'products/gatorade-lemon-lime-back.jpg', alt: 'Bottle of Gatorade Lemon-Lime sports drink', color: '#d9f06a' },
  { id: 'aquafina-water', category: 'drinks', brand: 'Aquafina®', flavor: 'Purified Water', name: 'Aquafina® Purified Water', price: 1, image: 'products/aquafina-water.jpg', backImage: 'products/aquafina-water-back.jpg', alt: 'Bottle of Aquafina purified water', color: '#bde9ff' },
];

const productId = new URLSearchParams(location.search).get('product') || '';
const activeProduct = menu.find((item) => item.id === productId);

let storedCart = {};
try {
  storedCart = JSON.parse(localStorage.getItem('snack-shack-cart') || '{}');
} catch {
  localStorage.removeItem('snack-shack-cart');
}
const cart = new Map(Object.entries(storedCart));

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
        <div class="detail-thumbnails" aria-label="Package views">
          <button class="detail-thumbnail selected" type="button" data-package-view="front" aria-pressed="true"><img src="${item.image}" alt="" /><span>Front</span></button>
          <button class="detail-thumbnail" type="button" data-package-view="back" aria-pressed="false"><img src="${item.backImage}" alt="" /><span>Back</span></button>
        </div>
        <div class="detail-gallery">
          <div class="detail-image-stage"><img id="detailImage" src="${item.image}" alt="Front of the ${item.name} package" /></div>
          <div class="gallery-dots" aria-hidden="true"><span class="selected"></span><span></span></div>
          <p id="packageViewLabel">Front of package</p>
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
  const detailImage = document.querySelector('#detailImage');
  const quantityLabel = document.querySelector('#detailQuantity');
  const viewLabel = document.querySelector('#packageViewLabel');
  const dots = [...document.querySelectorAll('.gallery-dots span')];

  document.querySelectorAll('[data-package-view]').forEach((button, index) => {
    button.addEventListener('click', () => {
      const isFront = button.dataset.packageView === 'front';
      detailImage.src = isFront ? item.image : item.backImage;
      detailImage.alt = `${isFront ? 'Front' : 'Back'} of the ${item.name} package`;
      viewLabel.textContent = `${isFront ? 'Front' : 'Back'} of package`;
      document.querySelectorAll('[data-package-view]').forEach((entry) => {
        const selected = entry === button;
        entry.classList.toggle('selected', selected);
        entry.setAttribute('aria-pressed', String(selected));
      });
      dots.forEach((dot, dotIndex) => dot.classList.toggle('selected', dotIndex === index));
    });
  });

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
