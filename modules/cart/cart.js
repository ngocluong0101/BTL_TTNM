const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

const demoProducts = [
  {
    id: 1,
    name: "Giày Chạy Bộ Nam HOKA Skyward",
    price: 1599000,
    category: "Giày chạy bộ",
    tone: "SKYWARD",
    subtitle: "Màu sắc: ICE GROUT / CYAN",
    description:
      "Mẫu giày chạy bộ mang lại cảm giác êm, bám chắc và ổn định cho hoạt động hằng ngày. Thiết kế hiện đại, tối giản và phù hợp cho nhiều kiểu phối đồ thể thao.",
    sizes: ["US 7", "US 7.5", "US 8", "US 8.5", "US 9", "US 9.5", "US 10"],
    thumbs: ["👟", "👟", "👟", "👟"],
    swatches: ["#dedbd5", "#86c2d9", "#c8d8be", "#9da6ad"],
    related: [1, 2, 3, 4],
  },
  {
    id: 2,
    name: "Giày Chạy Bộ Nam HOKA ONE ONE",
    price: 3999000,
    category: "Giày chạy bộ",
    tone: "HOKA",
    subtitle: "Màu sắc: GREY / BLUE",
    description:
      "Phiên bản HOKA cân bằng giữa sự nhẹ nhàng và độ nảy, hỗ trợ tốt cho những buổi chạy dài cũng như di chuyển thường ngày.",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    thumbs: ["👟", "👟", "👟", "👟"],
    swatches: ["#e6e6e6", "#d1e5f4", "#f3d6c6", "#c5cead"],
    related: [2, 3, 4, 5],
  },
  {
    id: 3,
    name: "Giày Chạy Bộ Nam HOKA Speedgoat",
    price: 2999000,
    category: "Giày chạy trail",
    tone: "TRAIL",
    subtitle: "Màu sắc: ORANGE / BLACK",
    description:
      "Mẫu giày thiên về trail với đế bám tốt, hình khối khỏe và phong cách thể thao nổi bật.",
    sizes: ["US 7.5", "US 8", "US 8.5", "US 9", "US 9.5"],
    thumbs: ["👟", "👟", "👟", "👟"],
    swatches: ["#ffb27b", "#4c4c4c", "#e7d3a8", "#9eb6d1"],
    related: [3, 4, 5, 6],
  },
  {
    id: 4,
    name: "Giày Chạy Bộ Nam HOKA Clifton",
    price: 1860000,
    category: "Giày running",
    tone: "CLIFTON",
    subtitle: "Màu sắc: GREY / SILVER",
    description:
      "Một thiết kế nhẹ, dễ mang và phù hợp cho hầu hết hoạt động chạy bộ với cảm giác thoáng chân.",
    sizes: ["US 7", "US 8", "US 9", "US 10"],
    thumbs: ["👟", "👟", "👟", "👟"],
    swatches: ["#d8d8d8", "#c4d9ea", "#f2ccb8", "#e2e2e2"],
    related: [4, 5, 6, 1],
  },
];

const cartItems = [
  {
    id: 1,
    name: "Tên sản phẩm",
    subtitle: "Tên hãng",
    price: 2519000,
    size: "US 10.5",
    quantity: 1,
    thumb: "👟",
  },
  {
    id: 2,
    name: "Tên sản phẩm",
    subtitle: "Tên hãng",
    price: 1219000,
    size: "US 9.5",
    quantity: 1,
    thumb: "👟",
  },
  {
    id: 3,
    name: "Tên sản phẩm",
    subtitle: "Tên hãng",
    price: 2019000,
    size: "US 9.5",
    quantity: 1,
    thumb: "👟",
  },
];

const state = {
  cart: cartItems.map((item) => ({ ...item })),
  modalItemId: null,
  selectedProductId: 1,
  selectedSize: "US 8.5",
  quantity: 1,
  activeTab: "description",
};

function getCurrentPage() {
  return document.body.dataset.page;
}

function getProductById(productId) {
  return (
    demoProducts.find((product) => product.id === productId) || demoProducts[0]
  );
}

function parseProductId() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  return Number.isFinite(id) && id > 0 ? id : 1;
}

function renderHome() {
  const categories = [
    ["👟", "Giày chạy bộ"],
    ["👚", "Áo thể thao"],
    ["🧥", "Áo khoác"],
    ["👖", "Quần thể thao"],
    ["🩳", "Quần ngắn"],
    ["🎽", "Áo ba lỗ"],
    ["🩱", "Đồ bơi"],
    ["🧢", "Phụ kiện"],
  ];

  const products = demoProducts.slice(0, 5).map((product, index) => ({
    ...product,
    tone: ["AIR MAX DAY", "TENNIS", "TRAIL RUN", "PFG", "AIR JORDAN"][index],
  }));

  const brands = [
    "adidas",
    "HOKA",
    "asics",
    "crocs",
    "puma",
    "teva",
    "Columbia",
    "Nike",
  ];

  const categoryRoot = $("#categoryGrid");
  if (categoryRoot) {
    categoryRoot.innerHTML = categories
      .map(
        ([icon, title]) => `
          <article class="category-card">
            <div class="category-card__icon" aria-hidden="true">${icon}</div>
            <div class="category-card__title">${title}</div>
          </article>
        `,
      )
      .join("");
  }

  const productStrip = $("#homeProductStrip");
  if (productStrip) {
    productStrip.innerHTML = products
      .map(
        (product) => `
          <article class="product-card product-card--feature">
            <div class="product-card__media" data-tone="${product.tone}"></div>
            <div class="product-card__body">
              <div class="product-card__name">${product.name}</div>
              <div class="product-card__price">${CartUtils.formatCurrency(product.price)} đ</div>
              <a class="btn btn--primary product-card__action" href="./cart-detail.html?id=${product.id}">MUA NGAY ></a>
            </div>
          </article>
        `,
      )
      .join("");
  }

  const brandRoot = $("#brandStrip");
  if (brandRoot) {
    brandRoot.innerHTML = brands
      .map((brand) => `<div class="brand-chip">${brand}</div>`)
      .join("");
  }

  const discoverButtons = $$(".js-open-detail");
  discoverButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const target = products[index % products.length];
      window.location.href = `./cart-detail.html?id=${target.id}`;
    });
  });
}

function renderDetail() {
  const product = getProductById(state.selectedProductId);
  const titleRoot = $("#detailTitle");
  if (!titleRoot) {
    return;
  }

  titleRoot.textContent = product.name;
  $("#detailPrice").textContent = `${CartUtils.formatCurrency(product.price)}đ`;
  $("#detailMeta").textContent = `Số lượng: 120  •  Đã bán: 1324`;
  $("#detailSubtitle").textContent = product.subtitle;
  $("#detailDescription").textContent = product.description;
  $("#detailMainImage").textContent = product.tone === "HOKA" ? "👟" : "🏃";
  $("#detailThumbs").innerHTML = product.thumbs
    .map(
      (thumb, index) =>
        `<button class="swatch ${index === 0 ? "swatch--active" : ""}" type="button">${thumb}</button>`,
    )
    .join("");

  $("#detailSizes").innerHTML = product.sizes
    .map(
      (size) => `
        <button class="size-btn ${size === state.selectedSize ? "size-btn--active" : ""}" type="button" data-size="${size}">${size}</button>
      `,
    )
    .join("");

  $("#detailRelated").innerHTML = product.related
    .map((id) => {
      const related = getProductById(id);
      return `
        <article class="related-card">
          <div class="related-card__media">👟</div>
          <div class="related-card__body">
            <div class="related-card__title">${related.name}</div>
            <div class="related-card__price">${CartUtils.formatCurrency(related.price)} đ</div>
          </div>
        </article>
      `;
    })
    .join("");

  $("#detailQty").textContent = String(state.quantity);

  $$("#detailSizes .size-btn").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSize = button.dataset.size;
      renderDetail();
    });
  });

  $$("#detailThumbs .swatch").forEach((button, index) => {
    button.addEventListener("click", () => {
      state.selectedSize = product.sizes[index % product.sizes.length];
      renderDetail();
    });
  });

  $("#detailMinus").addEventListener("click", () => {
    state.quantity = CartUtils.clamp(state.quantity - 1, 1, 99);
    renderDetail();
  });

  $("#detailPlus").addEventListener("click", () => {
    state.quantity = CartUtils.clamp(state.quantity + 1, 1, 99);
    renderDetail();
  });

  $("#detailAddToCart").addEventListener("click", () => {
    window.location.href = "./cart-list.html";
  });

  $("#detailBuyNow").addEventListener("click", () => {
    window.location.href = "./cart-list.html";
  });
}

function renderCart() {
  const bodyRoot = $("#cartRows");
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subTotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = 0;
  const total = subTotal - discount;

  $("#cartCount").textContent = String(totalCount);
  $("#summarySubtotal").textContent = `${CartUtils.formatCurrency(subTotal)}`;
  $("#summaryDiscount").textContent = `${CartUtils.formatCurrency(discount)}`;
  $("#summaryTotal").textContent = `${CartUtils.formatCurrency(total)}`;

  bodyRoot.innerHTML = "";

  state.cart.forEach((item) => {
    const row = CartUtils.createElement("article", "cart-row");
    row.dataset.itemId = String(item.id);
    row.innerHTML = `
      <input class="cart-row__checkbox" type="checkbox" checked />
      <div class="cart-row__thumb">${item.thumb}</div>
      <div class="cart-row__name">
        <div class="cart-row__title">${item.name}</div>
        <div class="cart-row__sub">${item.subtitle}</div>
      </div>
      <div class="cart-row__price">${CartUtils.formatCurrency(item.price)}</div>
      <div class="cart-row__size">${item.size}</div>
      <div class="quantity-control">
        <button type="button" class="js-qty-minus">-</button>
        <span>${item.quantity}</span>
        <button type="button" class="js-qty-plus">+</button>
      </div>
      <div class="cart-row__total">${CartUtils.formatCurrency(item.price * item.quantity)}</div>
      <button class="cart-row__delete js-delete-item" type="button">Xóa</button>
    `;
    bodyRoot.appendChild(row);
  });

  $$(".js-qty-minus", bodyRoot).forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest(".cart-row");
      const item = state.cart.find(
        (entry) => String(entry.id) === row.dataset.itemId,
      );
      if (!item) {
        return;
      }
      item.quantity = CartUtils.clamp(item.quantity - 1, 1, 99);
      renderCart();
    });
  });

  $$(".js-qty-plus", bodyRoot).forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest(".cart-row");
      const item = state.cart.find(
        (entry) => String(entry.id) === row.dataset.itemId,
      );
      if (!item) {
        return;
      }
      item.quantity = CartUtils.clamp(item.quantity + 1, 1, 99);
      renderCart();
    });
  });

  $$(".js-delete-item", bodyRoot).forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest(".cart-row");
      state.modalItemId = Number(row.dataset.itemId);
      showDeleteModal();
    });
  });
}

function showDeleteModal() {
  if (!window.CartCommon || !window.CartCommon.createConfirmModal) {
    return;
  }

  const modalRoot = $("#modalRoot");
  modalRoot.innerHTML = "";
  const modal = window.CartCommon.createConfirmModal({
    title: "Xóa sản phẩm",
    message: "Bạn có chắc chắn muốn xóa sản phẩm này không ?",
    confirmText: "Xác nhận",
    cancelText: "Hủy",
  });

  modalRoot.appendChild(modal);
  modal.hidden = false;

  $(".modal-btn--cancel", modal).addEventListener("click", hideDeleteModal);
  $(".modal-btn--confirm", modal).addEventListener("click", () => {
    state.cart = state.cart.filter((item) => item.id !== state.modalItemId);
    hideDeleteModal();
    renderCart();
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      hideDeleteModal();
    }
  });
}

function hideDeleteModal() {
  const modalRoot = $("#modalRoot");
  if (modalRoot) {
    modalRoot.innerHTML = "";
  }
  state.modalItemId = null;
}

function bindHomeActions() {
  $$(".js-open-detail").forEach((button, index) => {
    button.addEventListener("click", () => {
      const product = demoProducts[index % demoProducts.length];
      window.location.href = `./cart-detail.html?id=${product.id}`;
    });
  });
}

function bindCartActions() {
  const orderBtn = $("#checkoutBtn");
  if (orderBtn) {
    orderBtn.addEventListener("click", () => {
      // Save cart to localStorage before navigating
      localStorage.setItem("cart", JSON.stringify(state.cart));
      window.location.href = "../order-client/order-detail.html";
    });
  }
}

function initPage() {
  const page = getCurrentPage();
  if (page === "home") {
    renderHome();
    bindHomeActions();
  }

  if (page === "detail") {
    state.selectedProductId = parseProductId();
    renderDetail();
  }

  if (page === "cart") {
    renderCart();
    bindCartActions();
  }
}

document.addEventListener("DOMContentLoaded", initPage);
