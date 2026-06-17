/**
 * search-result.js
 * Module: modules/search/
 * Yêu cầu: products.js phải được load trước file này (khai báo demoProducts)
 */

(function () {
  "use strict";

  /* ── Helpers ─────────────────────────────────────────────── */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  /* ── Lấy từ khóa từ URL ?q= ──────────────────────────────── */
  function getKeyword() {
    const params = new URLSearchParams(window.location.search);
    return (params.get("q") || "").trim();
  }

  /* ── State ───────────────────────────────────────────────── */
  const state = {
    keyword  : getKeyword(),
    category : "",
    priceRange: "",
    sort     : "default",
  };

  /* ── Lấy data sản phẩm ───────────────────────────────────── */
  function getProducts() {
    if (typeof demoProducts !== "undefined" && Array.isArray(demoProducts)) {
      return demoProducts;
    }
    console.warn("search-result.js: demoProducts chưa được load. Kiểm tra products.js.");
    return [];
  }

  /* ── Lọc sản phẩm ────────────────────────────────────────── */
  function filterProducts() {
    let results = getProducts();

    // Tìm theo từ khóa — kiểm tra name, category, subtitle, description, tone
    if (state.keyword) {
      const kw = state.keyword.toLowerCase();
      results = results.filter((p) => {
        return (
          (p.name        && p.name.toLowerCase().includes(kw))        ||
          (p.category    && p.category.toLowerCase().includes(kw))    ||
          (p.subtitle    && p.subtitle.toLowerCase().includes(kw))    ||
          (p.description && p.description.toLowerCase().includes(kw)) ||
          (p.tone        && p.tone.toLowerCase().includes(kw))
        );
      });
    }

    // Lọc theo danh mục
    if (state.category) {
      results = results.filter((p) => p.category === state.category);
    }

    // Lọc theo khoảng giá
    if (state.priceRange) {
      const [min, max] = state.priceRange.split("-").map(Number);
      results = results.filter((p) => p.price >= min && p.price <= max);
    }

    return results;
  }

  /* ── Sắp xếp ─────────────────────────────────────────────── */
  function sortProducts(list) {
    const arr = [...list];
    switch (state.sort) {
      case "price-asc":  return arr.sort((a, b) => a.price - b.price);
      case "price-desc": return arr.sort((a, b) => b.price - a.price);
      case "name-asc":   return arr.sort((a, b) => a.name.localeCompare(b.name, "vi"));
      default:           return arr;
    }
  }

  /* ── Render 1 card sản phẩm ──────────────────────────────── */
  function renderCard(product) {
    const card = document.createElement("a");
    card.className = "search-product-card";
    card.href = `../cart/cart-detail.html?id=${product.id}`;
    card.innerHTML = `
      <div class="search-product-card__media">👟</div>
      <div class="search-product-card__body">
        <div class="search-product-card__category">${product.category || ""}</div>
        <div class="search-product-card__name">${product.name}</div>
        <div class="search-product-card__price">${formatCurrency(product.price)}</div>
      </div>
    `;
    return card;
  }

  /* ── Render toàn bộ grid ─────────────────────────────────── */
  function render() {
    const filtered = filterProducts();
    const sorted   = sortProducts(filtered);

    const grid     = $("#productGrid");
    const empty    = $("#emptyState");
    const countEl  = $("#resultCount");

    if (countEl) countEl.textContent = sorted.length;

    if (!grid) return;

    if (sorted.length === 0) {
      grid.innerHTML = "";
      if (empty) empty.hidden = false;
    } else {
      if (empty) empty.hidden = true;
      grid.innerHTML = "";
      sorted.forEach((p) => grid.appendChild(renderCard(p)));
    }
  }

  /* ── Bind filter sidebar ─────────────────────────────────── */
  function bindFilters() {
    $$('input[name="category"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        state.category = radio.value;
        render();
      });
    });

    $$('input[name="price"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        state.priceRange = radio.value;
        render();
      });
    });

    const resetBtn = $("#filterReset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.category  = "";
        state.priceRange = "";
        state.sort      = "default";

        const allCat = $('input[name="category"][value=""]');
        if (allCat) allCat.checked = true;
        const allPrice = $('input[name="price"][value=""]');
        if (allPrice) allPrice.checked = true;

        $$(".sort-tab").forEach((t) => t.classList.remove("sort-tab--active"));
        const defTab = $('[data-sort="default"]');
        if (defTab) defTab.classList.add("sort-tab--active");

        render();
      });
    }

    // Toggle collapse nhóm filter
    $$(".filter-group__header[data-toggle]").forEach((header) => {
      header.addEventListener("click", () => {
        const body = $("#" + header.dataset.toggle);
        if (!body) return;
        const collapsed = body.classList.toggle("is-hidden");
        header.classList.toggle("is-collapsed", collapsed);
      });
    });
  }

  /* ── Bind sort tabs ──────────────────────────────────────── */
  function bindSort() {
    $$(".sort-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        state.sort = tab.dataset.sort;
        $$(".sort-tab").forEach((t) => t.classList.remove("sort-tab--active"));
        tab.classList.add("sort-tab--active");
        render();
      });
    });
  }

  /* ── Hiển thị từ khóa lên UI ─────────────────────────────── */
  function displayKeyword() {
    const kw = state.keyword;

    const displayEl   = $("#searchKeywordDisplay");
    const breadcrumb  = $("#breadcrumbKeyword");

    if (displayEl)  displayEl.textContent  = kw || "Tất cả sản phẩm";
    if (breadcrumb) breadcrumb.textContent = kw ? `Tìm kiếm: "${kw}"` : "Tìm kiếm";

    document.title = kw
      ? `LLA Store - Kết quả: "${kw}"`
      : "LLA Store - Tìm kiếm";
  }

  /* ── Init ────────────────────────────────────────────────── */
  function init() {
    displayKeyword();
    bindFilters();
    bindSort();
    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();