<template>
    <div class="order-history-page">
      <h1>Lịch Sử Đơn Hàng</h1>
      <div v-if="orders.length === 0" class="empty-order-history">
        <p>Bạn chưa có đơn hàng nào.</p>
        <router-link to="/products" class="btn">Tiếp Tục Mua Sắm</router-link>
      </div>
      <div v-else>
        <ul class="order-list">
          <li v-for="order in orders" :key="order.id" class="order-item">
            <h3>Đơn Hàng #{{ order.id }}</h3>
            <p>Ngày Đặt: {{ formatDate(order.date) }}</p>
            <p>Tổng Tiền: {{ formattedPrice(order.total) }}</p>
            <p>Trạng Thái: <span :class="getStatusClass(order.status)">{{ order.status }}</span></p>
            <button @click="viewOrderDetails(order.id)" class="details-btn">Xem Chi Tiết</button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  
  export default {
    name: 'ComOrderHistory',
    setup() {
      const orders = ref([]);
  
      const fetchOrderHistory = async () => {
        // Giả lập gọi API để lấy lịch sử đơn hàng
        orders.value = await fetch('/api/orders/history').then(res => res.json());
      };
  
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
      };
  
      const formattedPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
  
      const getStatusClass = (status) => {
        return {
          'pending': 'status-pending',
          'completed': 'status-completed',
          'canceled': 'status-canceled',
        }[status] || '';
      };
  
      const viewOrderDetails = (orderId) => {
        alert(`Xem chi tiết đơn hàng #${orderId}`);
      };
  
      onMounted(() => {
        fetchOrderHistory();
      });
  
      return {
        orders,
        formatDate,
        formattedPrice,
        getStatusClass,
        viewOrderDetails,
      };
    },
  };
  </script>
  
  <style scoped>
  .order-history-page {
    padding: 20px;
  }
  
  .empty-order-history {
    text-align: center;
    font-size: 1.5em;
    color: #888;
  }
  
  .order-list {
    list-style-type: none;
    padding: 0;
  }
  
  .order-item {
    border: 1px solid #ddd;
    padding: 15px;
    margin: 10px 0;
    border-radius: 5px;
  }
  
  .details-btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .status-pending {
    color: orange;
  }
  
  .status-completed {
    color: green;
  }
  
  .status-canceled {
    color: red;
  }
  </style>