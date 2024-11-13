<template>
    <div>
      <h2>Quản Lý Đơn Hàng</h2>
      <div v-if="orders.length === 0" class="no-orders">
        <p>Không có đơn hàng nào.</p>
      </div>
      <ul v-else class="order-list">
        <li v-for="order in orders" :key="order.id" class="order-item">
          <p><strong>Đơn hàng #{{ order.id }}</strong></p>
          <p>Trạng thái: {{ order.status }}</p>
          <p>Tổng tiền: {{ formattedPrice(order.total) }}</p>
          <button @click="viewOrderDetails(order.id)">Xem Chi Tiết</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'OrderManagement',
    setup() {
      const orders = ref([]);
  
      const fetchOrders = async () => {
        orders.value = await fetch('/api/orders').then(res => res.json());
      };
  
      const viewOrderDetails = (orderId) => {
        console.log(`Xem chi tiết cho đơn hàng có ID: ${orderId}`);
      };
  
      const formattedPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
  
      onMounted(fetchOrders);
  
      return {
        orders,
        viewOrderDetails,
        formattedPrice,
      };
    },
  };
  </script>
  
  <style scoped>
  .no-orders {
    text-align: center;
    color: #999;
  }
  
  .order-list {
    list-style-type: none;
    padding: 0;
  }
  
  .order-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  </style>
  