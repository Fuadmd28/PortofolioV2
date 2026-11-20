// ===== Data Produk =====
const products = [
  {
    id: 1,
    name: "Capcut Pro",
    price: 8500,
    sold: 16,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/CapCut_logo.png/240px-CapCut_logo.png",
    iconBg: "#000000",
    badge: true,
    color: "#111827"
  },
  {
    id: 2,
    name: "Wink Vip",
    price: 7000,
    sold: 48,
    image: "",
    iconBg: "#000000",
    emoji: "ðŸ˜‰",
    badge: true,
    color: "#0f172a"
  },
  {
    id: 3,
    name: "Canva",
    price: 10000,
    sold: 1,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Canva_icon_2021.svg/240px-Canva_icon_2021.svg.png",
    iconBg: "#00C4CC",
    badge: true,
    color: "#1e1b4b"
  },
  {
    id: 4,
    name: "Spotify",
    price: 25000,
    sold: 2,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/240px-Spotify_icon.svg.png",
    iconBg: "#1DB954",
    badge: false,
    color: "#052e16"
  }
];

// Format Rupiah
function formatRupiah(num) {
  return "Rp" + num.toLocaleString("id-ID");
}

// Render produk
function renderProducts() {
  const grid = document.getElementById("productsGrid");
  grid.innerHTML = products.map(p => {
    const media = p.image
      ? `<img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
         <div class="product-fallback" style="display:none; background:${p.iconBg || '#222'};">${p.emoji || p.name.charAt(0)}</div>`
      : `<div class="product-fallback" style="background:${p.iconBg || '#222'};">${p.emoji || p.name.charAt(0)}</div>`;

    return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-image-wrap" style="background: linear-gradient(145deg, ${p.color}, #0a0a0f);">
        ${p.badge ? `<span class="badge-instan"><i class="fas fa-bolt"></i> Instan</span>` : ""}
        ${media}
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-price-label">mulai</p>
        <p class="product-price">${formatRupiah(p.price)}</p>
        <p class="product-sold">${p.sold} terjual</p>
        <button class="btn-order" onclick="openOrder(${p.id})">Order</button>
      </div>
    </article>
  `;
  }).join("");
}

// Modal
const modal = document.getElementById("orderModal");
const modalTitle = document.getElementById("modalTitle");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const buyerContact = document.getElementById("buyerContact");
const buyerNote = document.getElementById("buyerNote");

let currentProduct = null;

function openOrder(id) {
  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;

  modalTitle.textContent = "Order " + currentProduct.name;
  if (currentProduct.image) {
    modalImg.src = currentProduct.image;
    modalImg.style.display = "block";
  } else {
    modalImg.style.display = "none";
  }
  modalImg.alt = currentProduct.name;
  modalName.textContent = currentProduct.name;
  modalPrice.textContent = formatRupiah(currentProduct.price);
  buyerContact.value = "";
  buyerNote.value = "";

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeOrder() {
  modal.classList.remove("show");
  document.body.style.overflow = "";
  currentProduct = null;
}

document.getElementById("closeModal").addEventListener("click", closeOrder);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeOrder();
});

// Konfirmasi order
document.getElementById("confirmOrder").addEventListener("click", () => {
  const contact = buyerContact.value.trim();
  if (!contact) {
    showToast("Masukkan email atau nomor WhatsApp dulu ya!", true);
    return;
  }

  // Simulasi order (bisa diganti ke WhatsApp API / backend)
  const message = encodeURIComponent(
    `Halo, saya ingin order *${currentProduct.name}*\n` +
    `Harga: ${formatRupiah(currentProduct.price)}\n` +
    `Kontak: ${contact}\n` +
    (buyerNote.value ? `Catatan: ${buyerNote.value}` : "")
  );

  // Ganti nomor WA toko di sini
  const waNumber = "6281234567890";
  window.open(`https://wa.me/${waNumber}?text=${message}`, "_blank");

  closeOrder();
  showToast("Order berhasil dikirim ke WhatsApp!");
});

// Toast
function showToast(msg, isError = false) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.background = isError ? "#ef4444" : "#22c55e";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// Bottom nav
document.querySelectorAll(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const page = btn.dataset.page;
    if (page === "cara") {
      showToast("Cara order: Klik Order â†’ isi kontak â†’ konfirmasi via WA");
    } else if (page === "pesanan") {
      showToast("Fitur pesanan belum tersedia (demo)");
    }
  });
});

// Init
renderProducts();

// Update jam status bar (opsional)
function updateTime() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const el = document.querySelector(".status-bar .time");
  if (el) el.textContent = `${h}:${m}`;
}
updateTime();
setInterval(updateTime, 30000);
      
