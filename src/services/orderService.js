// src/services/orderServices.js

const { getOrders, addOrder, updateOrder, deleteOrder } = require('../data/orders'); // Import các hàm từ mô-đun orders

// Hàm lấy danh sách đơn hàng
const fetchOrders = () => {
  return getOrders();
};

// Hàm thêm đơn hàng mới
const createOrder = (orderData) => {
  if (!orderData || !orderData.userId || !orderData.productIds || orderData.productIds.length === 0) {
    throw new Error('Invalid order data'); // Kiểm tra dữ liệu đầu vào
  }
  return addOrder(orderData);
};

// Hàm cập nhật đơn hàng
const modifyOrder = (id, updatedData) => {
  const order = updateOrder(id, updatedData);
  if (!order) {
    throw new Error('Order not found'); // Kiểm tra xem đơn hàng có tồn tại không
  }
  return order;
};

// Hàm xóa đơn hàng
const removeOrder = (id) => {
  const order = deleteOrder(id);
  if (!order) {
    throw new Error('Order not found'); // Kiểm tra xem đơn hàng có tồn tại không
  }
  return order;
};

// Xuất khẩu các hàm để sử dụng ở nơi khác
module.exports = {
  fetchOrders,
  createOrder,
  modifyOrder,
  removeOrder,
};