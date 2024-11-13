<template>
    <div class="cart">
      <h2>Giỏ Hàng</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Giỏ hàng của bạn đang trống.</p>
      </div>
      <div v-else>
        <div class="cart-item" v-for="item in cartItems" :key="item.product.id">
          <img :src="item.product.image" alt="Product Image" class="cart-item-image" />
          <div class="cart-item-info">
            <h3 class="cart-item-name">{{ item.product.name }}</h3>
            <p class="cart-item-price">{{ formattedPrice(item.product.price) }}</p>
            <p class="cart-item-quantity">Số lượng: {{ item.quantity }}</p>
            <button @click="removeFromCart(item.product.id)" class="remove-button">Xóa</button>
          </div>
        </div>
        <div class="cart-summary">
          <h3>Tổng Giá: {{ totalAmount }}</h3>
          <button @click="checkout" class="checkout-button">Thanh Toán</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ComCart',
    setup() {
      const store = useStore();
  
      const cartItems = computed(() => {
        return store.getters['cart/cartItems'];
      });
  
      const totalAmount = computed(() => {
        return formattedPrice(cartItems.value.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0));
      });
  
      const formattedPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
  
      const removeFromCart = (productId) => {
        store.dispatch('cart/removeFromCart', productId);
      };
  
      const checkout = () => {
        // Logic for checkout (e.g., redirect to checkout page)
        alert('Chức năng thanh toán chưa được triển khai.');
      };
  
      return {
        cartItems,
        totalAmount,
        formattedPrice,
        removeFromCart,
        checkout,
      };
    },
  };
  </script>
  
  <style scoped>
  .cart {
    padding: 20px;
  }
  
  .empty-cart {
    text-align: center;
    font-size: 1.2em;
    color: #888;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  
  .cart-item-image {
    width: 80px;
    height: auto;
    margin-right: 20px;
  }
  
  .cart-item-info {
    flex-grow: 1;
  }
  
  .cart-item-name {
    font-size: 1.1em;
    font-weight: bold;
  }
  
  .cart-item-price {
    color: #d9534f;
  }
  
  .remove-button {
    background-color: #d9534f;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .remove-button:hover {
    background-color: #c9302c;
  }
  
  .cart-summary {
    margin-top: 20px;
    font-size: 1.2em;
  }
  
  .checkout-button {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .checkout-button:hover {
    background-color: #4cae4c;
  }
  </style>