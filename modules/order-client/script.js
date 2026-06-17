// Order Detail Page Script

class OrderDetail {
  constructor() {
    this.cartData = [];
    this.currentDiscount = 0;
    this.shippingFee = 35000;
    this.init();
  }

  init() {
    this.loadCartData();
    this.renderOrderItems();
    this.setupEventListeners();
    this.updateSummary();
    this.initializeAddressForm();
  }

  loadCartData() {
    // Get cart data from localStorage
    const cart = localStorage.getItem("cart");
    if (cart) {
      this.cartData = JSON.parse(cart);
    } else {
      // Fallback demo data
      this.cartData = [
        {
          id: 1,
          name: "Tênis sản phẩm",
          price: 2519000,
          size: "M",
          quantity: 1,
        },
        {
          id: 2,
          name: "Tênis sản phẩm",
          price: 1219000,
          size: "L",
          quantity: 1,
        },
        {
          id: 3,
          name: "Tênis sản phẩm",
          price: 2019000,
          size: "XL",
          quantity: 1,
        },
      ];
    }
  }

  renderOrderItems() {
    const tbody = document.getElementById("orderItemsBody");
    tbody.innerHTML = "";

    this.cartData.forEach((item) => {
      const row = document.createElement("tr");
      const total = item.price * item.quantity;
      row.innerHTML = `
        <td class="item-name">${item.name}</td>
        <td class="item-price">${this.formatCurrency(item.price)}</td>
        <td class="item-qty">${item.quantity}</td>
        <td class="item-total">${this.formatCurrency(total)}</td>
      `;
      tbody.appendChild(row);
    });
  }

  setupEventListeners() {
    // Address modal
    document
      .getElementById("changeAddressBtn")
      .addEventListener("click", () => this.openAddressModal());
    document
      .getElementById("closeAddressModal")
      .addEventListener("click", () => this.closeAddressModal());
    document
      .getElementById("cancelAddressBtn")
      .addEventListener("click", () => this.closeAddressModal());
    document
      .getElementById("addressModal")
      .addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          this.closeAddressModal();
        }
      });

    // Address form submission
    document
      .getElementById("addressForm")
      .addEventListener("submit", (e) => this.handleAddressSubmit(e));

    // Voucher
    document
      .getElementById("applyVoucherBtn")
      .addEventListener("click", () => this.applyVoucher());
    document
      .getElementById("voucherCode")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.applyVoucher();
        }
      });

    // Checkout
    document
      .getElementById("confirmOrderBtn")
      .addEventListener("click", () => this.confirmOrder());

    // Set current date
    const today = new Date();
    document.getElementById("orderDate").textContent = this.formatDate(today);
  }

  openAddressModal() {
    const modal = document.getElementById("addressModal");

    // Pre-fill form with current values
    document.getElementById("fullName").value =
      document.getElementById("deliveryName").textContent;
    document.getElementById("phone").value =
      document.getElementById("deliveryPhone").textContent;
    document.getElementById("address").value =
      document.getElementById("deliveryAddress").textContent;

    modal.classList.remove("hidden");
  }

  closeAddressModal() {
    document.getElementById("addressModal").classList.add("hidden");
  }

  handleAddressSubmit(e) {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    // Update address display
    document.getElementById("deliveryName").textContent = fullName;
    document.getElementById("deliveryPhone").textContent = phone;
    document.getElementById("deliveryAddress").textContent = address;
    document.getElementById("summaryDelivery").textContent = fullName;

    // Close modal
    this.closeAddressModal();

    // Show success message (Dùng alert tạm cho đổi địa chỉ)
    alert("Cập nhật địa chỉ thành công");
  }

  applyVoucher() {
    const code = document
      .getElementById("voucherCode")
      .value.trim()
      .toUpperCase();
    const message = document.getElementById("voucherMessage");

    if (!code) {
      message.textContent = "Vui lòng nhập mã voucher";
      message.classList.remove("success");
      message.classList.add("error");
      return;
    }

    // Mock voucher validation
    const vouchers = {
      SAVE10: 0.1, // 10% off
      SAVE20: 0.2, // 20% off
      SHIP0: 0, // Free shipping (special)
    };

    if (code in vouchers) {
      if (code === "SHIP0") {
        this.shippingFee = 0;
        message.textContent = "✓ Áp dụng thành công! Miễn phí vận chuyển";
        message.classList.remove("error");
        message.classList.add("success");
      } else {
        const discountPercent = vouchers[code] * 100;
        const subtotal = this.getSubtotal();
        this.currentDiscount = Math.floor(subtotal * vouchers[code]);
        message.textContent = `✓ Áp dụng thành công! Giảm ${discountPercent.toFixed(0)}%`;
        message.classList.remove("error");
        message.classList.add("success");
      }

      document.getElementById("voucherCode").disabled = true;
      document.getElementById("applyVoucherBtn").disabled = true;
      this.updateSummary();
    } else {
      message.textContent = "✗ Mã voucher không hợp lệ";
      message.classList.remove("success");
      message.classList.add("error");
      this.currentDiscount = 0;
    }
  }

  confirmOrder() {
    const paymentMethod = document.querySelector(
      'input[name="paymentMethod"]:checked'
    ).value;
    const notes = document.getElementById("orderNotes").value;

    // Validate address
    const deliveryName = document.getElementById("deliveryName").textContent;
    if (!deliveryName) {
      alert("Vui lòng cập nhật địa chỉ giao hàng");
      return;
    }

    // Vô hiệu hóa nút bấm để tránh click 2 lần
    const confirmBtn = document.getElementById("confirmOrderBtn");
    confirmBtn.disabled = true;
    confirmBtn.style.opacity = "0.7";
    confirmBtn.innerText = "Đang xử lý...";

    // Prepare order data
    const orderData = {
      orderId: this.generateOrderId(),
      items: this.cartData,
      deliveryName: deliveryName,
      deliveryPhone: document.getElementById("deliveryPhone").textContent,
      deliveryAddress: document.getElementById("deliveryAddress").textContent,
      subtotal: this.getSubtotal(),
      discount: this.currentDiscount,
      shipping: this.shippingFee,
      total: this.getTotal(),
      paymentMethod: paymentMethod,
      notes: notes,
      orderDate: new Date().toISOString(),
      status: "pending",
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem("cart");

    // Hiển thị Toast Notification Đẹp ở góc phải
    this.showNotification("Đặt hàng thành công! Đang chuyển trang...", "success");
    
    // Đợi 2 giây cho hiệu ứng thông báo chạy xong rồi mới chuyển trang
    setTimeout(() => {
      // Đổi thành link dẫn về thư mục đơn mua của bạn
      window.location.href = "../don-mua/index.html"; 
    }, 2000);
  }

  updateSummary() {
    const subtotal = this.getSubtotal();
    const total = this.getTotal();

    document.getElementById("summarySubtotal").textContent =
      this.formatCurrency(subtotal);
    document.getElementById("summaryDiscount").textContent =
      this.formatCurrency(this.currentDiscount);
    document.getElementById("summaryShipping").textContent =
      this.formatCurrency(this.shippingFee);
    document.getElementById("summaryTotal").textContent =
      this.formatCurrency(total);
  }

  getSubtotal() {
    return this.cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTotal() {
    return this.getSubtotal() - this.currentDiscount + this.shippingFee;
  }

  initializeAddressForm() {
    // Load default address from localStorage or use defaults
    const savedAddress = localStorage.getItem("userAddress");
    if (savedAddress) {
      const address = JSON.parse(savedAddress);
      document.getElementById("deliveryName").textContent = address.fullName;
      document.getElementById("deliveryPhone").textContent = address.phone;
      document.getElementById("deliveryAddress").textContent = address.address;
      document.getElementById("summaryDelivery").textContent = address.fullName;
    }
  }

  formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  generateOrderId() {
    return "ORD" + Date.now();
  }

  // Hàm tạo Toast Notification// 
  showNotification(message, type = "info") {
    if (type === "success") {
      const toast = document.createElement("div");
      toast.className = "custom-toast";

      // Cấu trúc HTML của thông báo bám sát thiết kế
      toast.innerHTML = `
        <div class="toast-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <div class="toast-content">
          <span class="toast-title">Thông báo</span>
          <span class="toast-message">${message}</span>
        </div>
        <div class="toast-close" onclick="this.parentElement.classList.remove('show')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      `;

      document.body.appendChild(toast);

      // Kích hoạt hiệu ứng trượt ra có độ nảy (nhờ CSS cubic-bezier)
      setTimeout(() => {
        toast.classList.add("show");
      }, 100);

      // Tự động ẩn sau 2 giây (khớp thời gian chuyển trang)
      setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
          toast.remove();
        }, 500);
      }, 2000);
    } else {
      alert(message);
    }
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new OrderDetail();
});