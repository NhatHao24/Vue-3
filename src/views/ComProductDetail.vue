<template>
    <div class="product-detail-page">
      <h1>{{ product.name }}</h1>
      <div class="product-image">
        <img :src="product.image" :alt="product.name">
      </div>
      <div class="product-info">
        <p>Giá: {{ formattedPrice(product.price) }}</p>
        <p>Mô tả: {{ product.description }}</p>
        <p>Số lượng: {{ product.quantity }}</p>
      </div>
      <div class="product-actions">
        <button @click="addToCart(product)" class="btn">Thêm vào giỏ hàng</button>
        <button @click="buyNow(product)" class="btn">Mua ngay</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router'; 
  
  export default {
    name: 'ComProductDetail',
    setup() {
      const store = useStore();
      const route = useRoute(); 
      const productId = route.params.id; 
      const product = ref({});
  
      const fetchProductDetail = async () => {
        product.value = await fetch(`/api/products/${productId}`).then(res => res.json());
      };
  
      const formattedPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
  
      const addToCart = (product) => {
        store.dispatch('cart/addToCart', product);
        alert(`Thêm sản phẩm ${product.name} vào giỏ hàng thành công!`);
      };
  
      const buyNow = (product) => {
        alert(`Mua ngay sản phẩm ${product.name} thành công!`);
      };
  
      onMounted(() => {
        fetchProductDetail();
      });
  
      return {
        product,
        formattedPrice,
        addToCart,
        buyNow,
      };
    },
  };
  </script>
  
  <style scoped>
  .product-detail-page {
    padding: 20px;
  }
  
  .product-image {
    width: 50%;
    margin: 20px auto;
  }
  
  .product-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .product-info {
    margin-bottom: 20px;
  }
  
  .product-actions {
    margin-top: 20px;
  }
  
  .btn {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #0069d9;
  }
  </style>