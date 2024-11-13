<template>
    <div class="cart-page">
      <h1>Giỏ Hàng</h1>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>Giỏ hàng của bạn đang trống.</p>
        <router-link to="/products" class="btn">Tiếp Tục Mua Sắm</router-link>
      </div>
      <div v-else>
        <ul class="cart-list">
          <li v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.image" alt="Product Image" class="product-image" />
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p>Giá: {{ formattedPrice(item.price) }}</p>
              <div class="quantity-control">
                <button @click="decreaseQuantity(item)">-</button>
                <input type="number" v-model.number="item.quantity" min="1" />
                <button @click="increaseQuantity(item)">+</button>
              </div>
              <button @click="removeFromCart(item.id)" class="remove-btn">Xóa</button>
            </div>
          </li>
        </ul>
        <div class="cart-summary">
          <h2>Tổng Tiền: {{ formattedTotal }}</h2>
          <button @click="checkout" class="checkout-btn">Thanh Toán</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ComCartPage',
    setup() {
      const store = useStore();
  
      const cartItems = computed(() => store.getters['cart/cartItems']);
      const totalAmount = computed(() => store.getters['cart/totalAmount']);
  
      const formattedTotal = computed(() => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount.value);
      });
  
      const formattedPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
  
      const increaseQuantity = (item) => {
        store.dispatch('cart/increaseQuantity', item.id);
      };
  
      const decreaseQuantity = (item) => {
        if (item.quantity > 1) {
          store.dispatch('cart/decreaseQuantity', item.id);
        }
      };
  
      const removeFromCart = (itemId) => {
        store.dispatch('cart/removeFromCart', itemId);
      };
  
      const checkout = () => {
        alert('Chức năng thanh toán chưa được triển khai.');
      };
  
      return {
        cartItems,
        formattedTotal,
        formattedPrice,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        checkout,
      };
    },
  };
  </script>
  
  <style scoped>
  .cart-page {
    padding: 20px;
  }
  
  .empty-cart {
    text-align: center;
    font-size: 1.5em;
    color: #888;
  }
  
  .cart-list {
    list-style-type: none;
    padding: 0;
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  
  .product-image {
    width: 100px;
    height: auto;
    margin-right: 20px;
  }
  
  .item-details {
    flex: 1;
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
  }
  
  .quantity-control button {
    width: 30px;
    height: 30px;
  }
  
  .remove-btn {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .cart-summary {
    margin-top: 20px;
    text-align: right;
  }
  
  .checkout-btn {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>