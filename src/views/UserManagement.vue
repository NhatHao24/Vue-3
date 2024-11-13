<template>
    <div>
      <h2>Quản Lý Người Dùng</h2>
      <div v-if="users.length === 0" class="no-users">
        <p>Không có người dùng nào.</p>
      </div>
      <ul v-else class="user-list">
        <li v-for="user in users" :key="user.id" class="user-item">
          <p><strong>{{ user.name }}</strong></p>
          <p>Email: {{ user.email }}</p>
          <button @click="editUser (user)">Sửa</button>
          <button @click="confirmDeleteUser (user.id)">Xóa</button>
        </li>
      </ul>
      <EditUserModal 
        v-if="isEditUserModalVisible" 
        :user="selectedUser " 
        @close="isEditUserModalVisible = false" 
        @user-updated="fetchUsers" 
      />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import EditUserModal from './EditUser Modal.vue'; 
  
  export default {
    name: 'UserManagement',
    components: {
      EditUserModal,
    },
    setup() {
      const users = ref([]);
      const isEditUserModalVisible = ref(false); 
      const selectedUser  = ref(null);
  
      const fetchUsers = async () => {
        users.value = await fetch('/api/users').then(res => res.json());
      };
  
      const editUser  = (user) => {
        selectedUser .value = user; 
        isEditUserModalVisible.value = true; 
      };
  
      const confirmDeleteUser  = (userId) => {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
          deleteUser (userId);
        }
      };
  
      const deleteUser  = async (userId) => {
        await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        fetchUsers(); 
      };
  
      onMounted(fetchUsers); 
  
      return {
        users,
        isEditUserModalVisible,
        selectedUser ,
        fetchUsers,
        editUser ,
        confirmDeleteUser ,
        deleteUser ,
      };
    },
  };
  </script>
  
  <style scoped>
  .no-users {
    text-align: center;
    color: #999;
  }
  
  .user-list {
    list-style-type: none;
    padding: 0;
  }
  
  .user-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  </style>