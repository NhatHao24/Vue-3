<template>
    <div class="home-page">
      <h1>Chào Mừng Đến Với Cửa Hàng Của Chúng Tôi</h1>
      <div class="featured-products">
        <h2>Sản Phẩm Nổi Bật</h2>
        <div class="product-list">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
          />
        </div>
      </div>
      <div class="promotions">
        <h2>Khuyến Mãi Đặc Biệt</h2>
        <div class="promotion-list">
          <PromotionCard
            v-for="promotion in promotions"
            :key="promotion.id"
            :promotion="promotion"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useStore } from 'vuex';
  import ProductCard from './ProductCard.vue';
  import PromotionCard from './PromotionCard.vue';
  
  export default {
    name: 'ComHome',
    components: {
      ProductCard,
      PromotionCard,
    },
    setup() {
      const store = useStore();
      const featuredProducts = ref([]);
      const promotions = ref([]);
  
      const fetchFeaturedProducts = async () => {
        featuredProducts.value = await fetch('/api/products/featured').then(res => res.json());
      };
  
      const fetchPromotions = async () => {
        promotions.value = await fetch('/api/promotions').then(res => res.json());
      };
  
      const addToCart = (product) => {
        store.dispatch('cart/addToCart', product);
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
      };
  
      onMounted(() => {
        fetchFeaturedProducts();
        fetchPromotions();
      });
  
      return {
        featuredProducts,
        promotions,
        addToCart,
      };
    },
  };
  </script>
  
  <style scoped>
  .home-page {
    padding: 20px;
  }
  
  .featured-products,
  .promotions {
    margin-bottom: 40px;
  }
  
  .product-list,
  .promotion-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  </style>