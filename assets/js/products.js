/**
 * products.js — Dữ liệu sản phẩm dùng chung toàn app
 * Load file này TRƯỚC cart.js và search-result.js
 */

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