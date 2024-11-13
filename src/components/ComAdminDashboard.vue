<template>
    <div class="admin-dashboard">
      <h2>Bảng Điều Khiển Quản Trị</h2>
      <div class="dashboard-cards">
        <div class="card">
          <h3>Số Lượng Sản Phẩm</h3>
          <p>{{ productCount }}</p>
        </div>
        <div class="card">
          <h3>Số Lượng Đơn Hàng</h3>
          <p>{{ orderCount }}</p>
        </div>
        <div class="card">
          <h3>Doanh Thu</h3>
          <p>{{ formattedRevenue }}</p>
        </div>
      </div>
  
      <h3>Hoạt Động Gần Đây</h3>
      <div v-if="recentActivities.length === 0" class="no-activities">
        <p>Không có hoạt động nào gần đây.</p>
      </div>
      <ul v-else class="activity-list">
        <li v-for="activity in recentActivities" :key="activity.id" class="activity-item">
          <p><strong>{{ activity.type }}</strong>: {{ activity.description }}</p>
          <p><em>{{ formatDate(activity.date) }}</em></p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ComAdminDashboard',
    setup() {
      const store = useStore();
  
      const productCount = computed(() => store.getters['products/productCount']);
      const orderCount = computed(() => store.getters['orders/orderCount']);
      const revenue = computed(() => store.getters['orders/totalRevenue']);
      const recentActivities = computed(() => store.getters['activities/recentActivities']);
  
      const formattedRevenue = computed(() => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(revenue.value);
      });
  
      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
      };
  
      return {
        productCount,
        orderCount,
        formattedRevenue,
        recentActivities,
        formatDate,
      };
    },
  };
  </script>
  
  <style scoped>
  .admin-dashboard {
    padding: 20px;
  }
  
  .dashboard-cards {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  
  .card {
    flex: 1;
    margin: 0 10px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
    background-color: #f9f9f9;
  }
  
  .card h3 {
    margin-bottom: 10px;
  }
  
  .no-activities {
    text-align: center;
    font-size: 1.2em;
    color: #888;
  }
  
  .activity-list {
    list-style-type: none;
    padding: 0;
  }
  
  .activity-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  </style>