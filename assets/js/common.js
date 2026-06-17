window.CartCommon = (() => {

  /**
   * Tính đường dẫn tương đối từ trang hiện tại tới thư mục modules/
   * Cấu trúc project:
   *   assets/js/common.js
   *   modules/cart/cart-home.html      → prefix = "../"
   *   modules/search/search-result.html → prefix = "../"
   *   modules/don-mua/index.html        → prefix = "../"
   *   (nếu có trang ở gốc)              → prefix = "modules/"
   */
  function getModulePrefix() {
    const path = window.location.pathname;
    // Nếu đang trong modules/<ten-module>/
    if (path.includes("/modules/")) {
      return "../";          // lên 1 cấp = thư mục modules/
    }
    return "modules/";       // đang ở gốc
  }

  function buildHeader(activePage) {
    const isHomeActive    = activePage === "home";
    const isProductActive = activePage === "detail";
    const isCartActive    = activePage === "cart";
    const isSearchActive  = activePage === "search";

    const p = getModulePrefix(); // ví dụ "../" khi đang trong modules/cart/

    return `
      <header class="site-header">
        <div class="site-header__top">
          <div class="site-header__top-inner">
            <a class="brand" href="${p}cart/cart-home.html" aria-label="LLA Store trang chủ">
              <span class="brand__text">LLA<br />STORE</span>
            </a>

            <div class="searchbar" role="search" aria-label="Tìm kiếm sản phẩm">
              <div class="searchbar__field">
                <input class="searchbar__input" type="search" placeholder="Tìm kiếm sản phẩm..." />
                <span class="searchbar__icon" aria-hidden="true" style="cursor:pointer">⌕</span>
              </div>
            </div>

            <div class="header-actions">
              <button class="header-action" type="button" aria-label="Thông báo">
                <span class="header-action__badge">0</span>
                <span aria-hidden="true">◔</span>
              </button>
              <a class="header-action" href="${p}cart/cart-list.html" aria-label="Giỏ hàng">
                <span class="header-action__badge" id="cartCount">0</span>
                <span aria-hidden="true">🛒</span>
              </a>
              <div class="account-pill" aria-label="Tài khoản">
                <span class="account-pill__icon" aria-hidden="true">👤</span>
                <div class="account-pill__text">
                  <strong>Sign In</strong><br />Account
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="site-header__nav">
          <div class="site-header__nav-inner">
            <a class="nav-toggle" href="${p}cart/cart-home.html">
              <span aria-hidden="true">☰</span>
              <span>Danh mục sản phẩm</span>
            </a>
            <span class="nav-divider"></span>
            <a class="nav-link ${isHomeActive    ? "nav-link--active" : ""}" href="${p}cart/cart-home.html">Trang chủ</a>
            <a class="nav-link ${isProductActive ? "nav-link--active" : ""}" href="${p}cart/cart-detail.html">Sản phẩm</a>
            <a class="nav-link"                                               href="${p}cart/cart-home.html#promotion">Khuyến mãi</a>
            <a class="nav-link ${isCartActive    ? "nav-link--active" : ""}" href="${p}don-mua/index.html">Đơn mua</a>
            <div class="nav-divider"></div>
            <span class="nav-pill">Best Seller <span class="badge">Sale</span></span>
          </div>
        </div>
      </header>
    `;
  }

  function buildFooter() {
    return `
      <footer class="site-footer">
        <section class="footer-promo">
          <div class="footer-promo__inner">
            <div class="footer-promo__card">
              <div class="footer-promo__title">
                <span aria-hidden="true">🛍️</span>
                <span>LLA SPORTS LUÔN LẮNG NGHE BẠN</span>
              </div>
              <a class="btn btn--light footer-promo__action" href="#">Đánh giá ngay</a>
            </div>
            <div class="footer-promo__card">
              <div class="footer-promo__title">
                <span aria-hidden="true">🎁</span>
                <span>ĐĂNG KÝ NHẬN NGAY VOUCHER 150K</span>
              </div>
              <a class="btn btn--light footer-promo__action" href="#">Đăng ký ngay</a>
            </div>
          </div>
        </section>

        <section class="footer-links">
          <div class="footer-col">
            <h3 class="footer-col__title">VỀ LLA SPORTS</h3>
            <ul class="footer-col__list">
              <li>Giới thiệu</li>
              <li>Hệ thống cửa hàng</li>
              <li>Thông tin liên hệ</li>
              <li>Các điều khoản và điều kiện</li>
              <li>Hợp tác cùng chúng tôi</li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="footer-col__title">Hỗ trợ khách hàng</h3>
            <ul class="footer-col__list">
              <li>Chính sách giao hàng</li>
              <li>Chính sách đổi trả hàng - Bảo hành</li>
              <li>Chính sách trả góp</li>
              <li>Chính sách bảo mật</li>
              <li>Hỗ trợ và giải đáp thắc mắc</li>
              <li>Hướng dẫn mua hàng</li>
              <li>Hướng dẫn chọn size</li>
              <li>Tra cứu đơn hàng</li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="footer-col__title">Group Business</h3>
            <ul class="footer-col__list">
              <li>GO! Việt Nam</li>
            </ul>
          </div>
          <div class="footer-col">
            <h3 class="footer-col__title">PHƯƠNG THỨC THANH TOÁN</h3>
            <div class="payments">
              <span class="payments__item">momo</span>
              <span class="payments__item">zalo</span>
              <span class="payments__item">COD</span>
              <span class="payments__item">VISA</span>
              <span class="payments__item">ATM</span>
              <span class="payments__item">QR</span>
            </div>
          </div>
        </section>

        <section class="footer-legal">
          <div class="footer-certifications">
            <span class="footer-certifications__chip">ĐÃ THÔNG BÁO BỘ CÔNG THƯƠNG</span>
            <span class="footer-certifications__chip">DMCa</span>
          </div>
          <div class="muted">© LLA Sports</div>
        </section>
      </footer>
    `;
  }

  function createConfirmModal({ title, message, confirmText, cancelText }) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.hidden = true;
    overlay.innerHTML = `
      <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <h3 class="modal-card__title" id="modalTitle"></h3>
        <div class="modal-card__divider"></div>
        <p class="modal-card__text"></p>
        <div class="modal-card__actions">
          <button class="modal-btn modal-btn--confirm" type="button"></button>
          <button class="modal-btn modal-btn--cancel" type="button"></button>
        </div>
      </div>
    `;
    overlay.querySelector(".modal-card__title").textContent = title;
    overlay.querySelector(".modal-card__text").textContent  = message;
    overlay.querySelector(".modal-btn--confirm").textContent = confirmText;
    overlay.querySelector(".modal-btn--cancel").textContent  = cancelText;
    return overlay;
  }

  function bindSearchBar() {
    const p = getModulePrefix();
    const SEARCH_URL = p + "search/search-result.html";

    function doSearch() {
      const input   = document.querySelector(".searchbar__input");
      const keyword = input ? input.value.trim() : "";
      if (!keyword) return;
      window.location.href = SEARCH_URL + "?q=" + encodeURIComponent(keyword);
    }

    const input = document.querySelector(".searchbar__input");
    const icon  = document.querySelector(".searchbar__icon");

    if (input) {
      // Điền sẵn từ khóa nếu đang ở trang kết quả
      const params = new URLSearchParams(window.location.search);
      const kw = params.get("q");
      if (kw) input.value = kw;

      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") doSearch();
      });
    }

    if (icon) {
      icon.addEventListener("click", doSearch);
    }
  }

  function mountSharedChrome() {
    document.querySelectorAll("[data-common-header]").forEach((node) => {
      node.innerHTML = buildHeader(node.dataset.activePage || "");
    });
    document.querySelectorAll("[data-common-footer]").forEach((node) => {
      node.innerHTML = buildFooter();
    });

    // Bind search sau khi header đã được inject vào DOM
    bindSearchBar();
  }

  return {
    mountSharedChrome,
    createConfirmModal,
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  if (window.CartCommon) {
    window.CartCommon.mountSharedChrome();
  }
});