let products = []; 
const getProducts = () => {
  return products;
};

const addProduct = (product) => {
  const newProduct = {
    id: product.length + 1,
    ...product,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  products.push(newProduct);
  return newProduct;
};

const updateProduct = (id, updatedData) => {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    const updatedProduct = {
      ...products[productIndex],
      ...updatedData,
      updatedAt: new Date(), 
    };
    products[productIndex] = updatedProduct; 
    return updatedProduct;
  }
  return null; 
};

const deleteProduct = (id) => {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex !== -1) {
    return products.splice(productIndex, 1)[0]; 
  }
  return null; 
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};