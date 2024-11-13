// src/services/userServices.js

const { getUsers, addUser , updateUser , deleteUser  } = require('../data/users'); // Import các hàm từ mô-đun users

// Hàm lấy danh sách người dùng
const fetchUsers = () => {
  return getUsers();
};

// Hàm thêm người dùng mới
const createUser  = (userData) => {
  if (!userData || !userData.username || !userData.email) {
    throw new Error('Invalid user data'); // Kiểm tra dữ liệu đầu vào
  }
  return addUser (userData);
};

// Hàm cập nhật thông tin người dùng
const modifyUser  = (id, updatedData) => {
  const user = updateUser (id, updatedData);
  if (!user) {
    throw new Error('User  not found'); // Kiểm tra xem người dùng có tồn tại không
  }
  return user;
};

// Hàm xóa người dùng
const removeUser  = (id) => {
  const user = deleteUser (id);
  if (!user) {
    throw new Error('User  not found'); // Kiểm tra xem người dùng có tồn tại không
  }
  return user;
};

// Xuất khẩu các hàm để sử dụng ở nơi khác
module.exports = {
  fetchUsers,
  createUser ,
  modifyUser ,
  removeUser ,
};