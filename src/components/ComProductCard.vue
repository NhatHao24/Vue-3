<template>
    <div class="product-card">
      <img :src="product.image" alt="Product Image" class="product-image" />
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">{{ formattedPrice }}</p>
        <div class="product-rating">
          <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= product.rating }">★</span>
        </div>
        <button @click="addToCart" class="add-to-cart-button">Thêm vào giỏ hàng</button>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ComProductCard',
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      const store = useStore();
  
      const formattedPrice = computed(() => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.product.price);
      });
  
      const addToCart = () => {
        store.dispatch('cart/addToCart', { productId: props.product.id, quantity: 1 });
      };
  
      return {
        formattedPrice,
        addToCart,
      };
    },
  };
  </script>
  
  <style scoped>
  .product-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    transition: box-shadow 0.3s;
  }
  
  .product-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .product-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .product-info {
    margin-top: 12px;
  }
  
  .product-name {
    font-size: 1.2em;
    font-weight: bold;
  }
  
  .product-description {
    font-size: 0.9em;
    color: #555;
  }
  
  .product-price {
    font-size: 1.1em;
    color: #d9534f;
    margin: 8px 0;
  }
  
  .product-rating {
    margin: 8px 0;
  }
  
  .star {
    color: #ccc;
  }
  
  .star.filled {
    color: #f39c12;
  }
  
  .add-to-cart-button {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .add-to-cart-button:hover {
    background-color: #4cae4c;
  }
  </style>