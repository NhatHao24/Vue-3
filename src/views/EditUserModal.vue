<template>
    <div class="modal">
      <div class="modal-content">
        <h3>Chỉnh Sửa Người Dùng</h3>
        <label for="name">Tên:</label>
        <input type="text" v-model="editedUser .name" id="name" />
        <label for="email">Email:</label>
        <input type="email" v-model="editedUser .email" id="email" />
        <button @click="updateUser ">Cập Nhật</button>
        <button @click="$emit('close')">Hủy</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    setup(props, { emit }) {
      const editedUser  = ref({ ...props.user }); 
  
      const updateUser  = async () => {
        await fetch(`/api/users/${editedUser .value.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedUser .value),
        });
        emit('user-updated'); 
      };
  
      return {
        editedUser ,
        updateUser ,
      };
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  </style>