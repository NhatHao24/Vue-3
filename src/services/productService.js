// src/services/productServices.js

const { getProducts, addProduct, updateProduct, deleteProduct } = require('../data/products'); // Import các hàm từ mô-đun products

// Hàm lấy danh sách sản phẩm
const fetchProducts = () => {
  return getProducts();
};

// Hàm thêm sản phẩm mới
const createProduct = (productData) => {
  if (!productData || !productData.name || !productData.price) {
    throw new Error('Invalid product data'); // Kiểm tra dữ liệu đầu vào
  }
  return addProduct(productData);
};

// Hàm cập nhật sản phẩm
const modifyProduct = (id, updatedData) => {
  const product = updateProduct(id, updatedData);
  if (!product) {
    throw new Error('Product not found'); // Kiểm tra xem sản phẩm có tồn tại không
  }
  return product;
};

// Hàm xóa sản phẩm
const removeProduct = (id) => {
  const product = deleteProduct(id);
  if (!product) {
    throw new Error('Product not found'); // Kiểm tra xem sản phẩm có tồn tại không
  }
  return product;
};

// Xuất khẩu các hàm để sử dụng ở nơi khác
module.exports = {
  fetchProducts,
  createProduct,
  modifyProduct,
  removeProduct,
};