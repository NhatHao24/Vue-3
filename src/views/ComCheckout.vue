<template>
    <div class="checkout-page">
      <h1>Thanh Toán</h1>
      <form @submit.prevent="submitOrder">
        <div class="form-group">
          <label for="name">Họ và Tên:</label>
          <input type="text" id="name" v-model="orderDetails.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="orderDetails.email" required />
        </div>
        <div class="form-group">
          <label for="address">Địa Chỉ:</label>
          <input type="text" id="address" v-model="orderDetails.address" required />
        </div>
        <div class="form-group">
          <label for="phone">Số Điện Thoại:</label>
          <input type="tel" id="phone" v-model="orderDetails.phone" required />
        </div>
        <div class="form-group">
          <label for="paymentMethod">Phương Thức Thanh Toán:</label>
          <select id="paymentMethod" v-model="orderDetails.paymentMethod" required>
            <option value="creditCard">Thẻ Tín Dụng</option>
            <option value="paypal">PayPal</option>
            <option value="cashOnDelivery">Thanh Toán Khi Nhận Hàng</option>
          </select>
        </div>
        <div class="order-summary">
          <h2>Tổng Tiền: {{ formattedTotal }}</h2>
        </div>
        <button type="submit" class="submit-btn">Xác Nhận Đơn Hàng</button>
      </form>
    </div>
  </template>
  
  <script>
  import { computed, ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'ComCheckout',
    setup() {
      const store = useStore();
      const orderDetails = ref({
        name: '',
        email: '',
        address: '',
        phone: '',
        paymentMethod: 'creditCard',
      });
  
      const totalAmount = computed(() => store.getters['cart/totalAmount']);
  
      const formattedTotal = computed(() => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount.value);
      });
  
      const submitOrder = () => {
        const orderData = {
          ...orderDetails.value,
          total: totalAmount.value,
        };
  
        console.log('Đơn hàng đã được gửi:', orderData);
        alert('Đơn hàng của bạn đã được xác nhận!');
        store.dispatch('cart/clearCart');
      };
  
      return {
        orderDetails,
        formattedTotal,
        submitOrder,
      };
    },
  };
  </script>
  
  <style scoped>
  .checkout-page {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .order-summary {
    margin-top: 20px;
    font-size: 1.5em;
  }
  
  .submit-btn {
    background-color: #5cb85c;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>