<template>
    <div>
      <h2>Quản Lý Sản Phẩm</h2>
      <button @click="showAddProductModal">Thêm Sản Phẩm</button>
      <div v-if="products.length === 0" class="no-products">
        <p>Không có sản phẩm nào.</p>
      </div>
      <ul v-else class="product-list">
        <li v-for="product in products" :key="product.id" class="product-item">
          <p><strong>{{ product.name }}</strong></p>
          <p>Giá: {{ formattedPrice(product.price) }}</p>
          <button @click="editProduct(product)">Sửa</button>
          <button @click="confirmDeleteProduct(product.id)">Xóa</button>
        </li>
      </ul>
      <AddProductModal v-if="isAddProductModalVisible" @close="isAddProductModalVisible = false" @product-added="fetchProducts" />
      <EditProductModal v-if="isEditProductModalVisible" :product="selectedProduct" @close="isEditProductModalVisible = false" @product-updated="fetchProducts" />
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import AddProductModal from './AddProductModal.vue';
  import EditProductModal from './EditProductModal.vue'; 
  
  export default {
    name: 'ProductManagement',
    components: {
      AddProductModal,
      EditProductModal,
    },
    setup() {
      const products = ref([]);
      const isAddProductModalVisible = ref(false);
      const isEditProductModalVisible = ref(false);
      const selectedProduct = ref(null); 
  
      const fetchProducts = async () => {
        products.value = await fetch('/api/products').then(res => res.json());
      };
  
      const showAddProductModal = () => {
        isAddProductModalVisible.value = true;
      };
  
      const editProduct = (product) => {
        selectedProduct.value = product; 
        isEditProductModalVisible.value = true; 
      };
  
      const confirmDeleteProduct = (productId) => {
        if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
          deleteProduct(productId);
        }
      };
  
      const deleteProduct = async (productId) => {
        await fetch(`/api/products/${productId}`, { method: 'DELETE' });
        fetchProducts();
      };
  
      const formattedPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
      };
  
      onMounted(fetchProducts);
  
      return {
        products,
        isAddProductModalVisible,
        isEditProductModalVisible,
        selectedProduct,
        showAddProductModal,
        editProduct,
        confirmDeleteProduct,
        deleteProduct,
        formattedPrice,
      };
    },
  };
  </script>
  
  <style scoped>
  .no-products {
    text-align: center;
    color: #999;
  }
  
  .product-list {
    list-style-type: none;
    padding: 0;
  }
  
  .product-item {
    border: 1px solid #ddd;
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
  }
  </style>