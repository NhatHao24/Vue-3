<template>
    <div class="product-list-page">
      <h1>Danh Sách Sản Phẩm</h1>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-item">
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p>Giá: {{ formattedPrice(product.price) }}</p>
            <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }" class="btn">Xem Chi Tiết</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'ComProductList',
    setup() {
      const products = ref([]);
  
      const fetchProducts = async () => {
        products.value = await fetch('/api/products').then(res => res.json());
      };
  
      const formattedPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
  
      onMounted(() => {
        fetchProducts();
      });
  
      return {
        products,
        formattedPrice,
      };
    },
  };
  </script>
  
  <style scoped>
  .product-list-page {
    padding: 20px;
  }
  
  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .product-item {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 15px;
    width: calc(33.333% - 20px); 
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .product-info {
    text-align: center;
  }
  
  .btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
  }
  
  .btn:hover {
    background-color: #0069d9;
  }
  </style>