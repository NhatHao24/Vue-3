<template>
    <div class="user-profile">
      <h2>Thông Tin Người Dùng</h2>
      <form @submit.prevent="updateProfile">
        <div class="form-group">
          <label for="username">Tên Đăng Nhập:</label>
          <input type="text" id="username" v-model="user.username" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="user.email" required />
        </div>
        <div class="form-group">
          <label for="phone">Số Điện Thoại:</label>
          <input type="tel" id="phone" v-model="user.phone" />
        </div>
        <button type="submit" class="update-button">Cập Nhật Thông Tin</button>
      </form>
  
      <h3>Lịch Sử Đơn Hàng</h3>
      <div v-if="orders.length === 0" class="no-orders">
        <p>Không có đơn hàng nào.</p>
      </div>
      <div v-else>
        <ul class="order-list">
          <li v-for="order in orders" :key="order.id" class="order-item">
            <p><strong>Đơn Hàng ID:</strong> {{ order.id }}</p>
            <p><strong>Ngày Đặt:</strong> {{ formatDate(order.date) }}</p>
            <p><strong>Tổng Giá:</strong> {{ formattedPrice(order.total) }}</p>
            <p><strong>Trạng Thái:</strong> {{ order.status }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ComUserProfile',
    setup() {
      const store = useStore();
  
      const user = computed(() => store.getters['user/currentUser ']);
      const orders = computed(() => store.getters['orders/userOrders']);
  
      const updateProfile = () => {
        store.dispatch('user/updateUser ', user.value);
      };
  
      const formattedPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
  
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
      };
  
      return {
        user,
        orders,
        updateProfile,
        formattedPrice,
        formatDate,
      };
    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .update-button {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .update-button:hover {
    background-color: #4cae4c;
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
  
  .no-orders {
    text-align: center;
    font-size: 1.2em;
    color: #888;
  }
  </style>