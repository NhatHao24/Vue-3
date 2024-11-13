<template>
    <div class="admin-container">
      <h1>Quản Trị Viên</h1>
      <div class="tabs">
        <button @click="activeTab = 'products'" :class="{ active: activeTab === 'products' }">Sản Phẩm</button>
        <button @click="activeTab = 'orders'" :class="{ active: activeTab === 'orders' }">Đơn Hàng</button>
        <button @click="activeTab = 'users'" :class="{ active: activeTab === 'users' }">Người Dùng</button>
      </div>
  
      <div class="tab-content">
        <div v-if="activeTab === 'products'">
          <ProductManagement />
        </div>
        <div v-if="activeTab === 'orders'">
          <OrderManagement />
        </div>
        <div v-if="activeTab === 'users'">
          <UserManagement />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import ProductManagement from './ProductManagement.vue';
  import OrderManagement from './OrderManagement.vue';
  import UserManagement from './UserManagement.vue';
  
  export default {
    name: 'ComAdmin',
    components: {
      ProductManagement,
      OrderManagement,
      UserManagement,
    },
    setup() {
      const activeTab = ref('products'); 
  
      return {
        activeTab,
      };
    },
  };
  </script>
  
  <style scoped>
  .admin-container {
    padding: 20px;
  }
  
  .tabs {
    display: flex;
    margin-bottom: 20px;
  }
  
  .tabs button {
    flex: 1;
    padding: 10px;
    border: none;
    background-color: #f1f1f1;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .tabs button.active {
    background-color: #5cb85c;
    color: white;
  }
  
  .tab-content {
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
  }
  </style>
  