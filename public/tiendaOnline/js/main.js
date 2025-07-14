// ========== CARRITO DE COMPRAS ==========
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const notification = document.getElementById('notification');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button class="remove-item" data-idx="${idx}" aria-label="Eliminar del carrito">&times;</button>
    `;
    cartItemsList.appendChild(li);
    total += item.price * item.qty;
  });
  cartCount.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function showNotification(msg) {
  notification.textContent = msg;
  notification.classList.remove('hidden');
  setTimeout(() => notification.classList.add('hidden'), 2000);
}

function addToCart(productName, price) {
  const idx = cart.findIndex(item => item.name === productName);
  if (idx > -1) {
    cart[idx].qty++;
  } else {
    cart.push({ name: productName, price, qty: 1 });
  }
  updateCartUI();
  showNotification(`${productName} añadido al carrito!`);
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCartUI();
}

// ========== MENÚ HAMBURGUESA ==========
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

// Crear overlay para cerrar menú móvil
let overlay = document.getElementById('mobile-menu-overlay');
if (!overlay) {
  overlay = document.createElement('div');
  overlay.id = 'mobile-menu-overlay';
  document.body.appendChild(overlay);
}

function openMobileMenu() {
  hamburgerBtn.classList.add('active');
  mobileMenu.classList.add('show');
  mobileMenu.hidden = false;
  overlay.classList.add('show');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  hamburgerBtn.classList.remove('active');
  mobileMenu.classList.remove('show');
  setTimeout(() => { mobileMenu.hidden = true; }, 350);
  overlay.classList.remove('show');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', () => {
  if (mobileMenu.classList.contains('show')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});
overlay.addEventListener('click', closeMobileMenu);
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) closeMobileMenu();
});
// Cerrar con ESC
window.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('show')) closeMobileMenu();
});
// Accesibilidad: cerrar al hacer click en un enlace
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// ========== EVENTOS ==========
document.querySelectorAll('.btn.buy').forEach(btn => {
  btn.addEventListener('click', e => {
    const product = btn.dataset.product;
    let price = 0;
    // Precios hardcodeados (debería venir de un dataset o backend)
    switch(product) {
      case 'PS5 Headset': price = 99.99; break;
      case 'PS5 Controller': price = 59.99; break;
      case 'Iphone 12 Pro Max': price = 999.99; break;
      case 'Airpods Pro': price = 172.82; break;
      case 'Galaxy S21': price = 1100.99; break;
      case 'Xbox Series S': price = 399.99; break;
      case 'Sony Playstation 5': price = 400.00; break;
      default: price = 0;
    }
    addToCart(product, price);
  });
});

cartBtn.addEventListener('click', () => {
  cartModal.classList.remove('hidden');
  cartModal.setAttribute('aria-hidden', 'false');
});

closeCartBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
  cartModal.setAttribute('aria-hidden', 'true');
});

cartItemsList.addEventListener('click', e => {
  if (e.target.classList.contains('remove-item')) {
    const idx = e.target.dataset.idx;
    removeFromCart(idx);
  }
});

// ========== SUSCRIPCIÓN (simulada) ==========
const subscribeForm = document.querySelector('.suscribe form');
if (subscribeForm) {
  subscribeForm.addEventListener('submit', e => {
    e.preventDefault();
    showNotification('¡Gracias por suscribirte!');
    subscribeForm.reset();
  });
}

// Inicializar UI carrito al cargar
updateCartUI(); 