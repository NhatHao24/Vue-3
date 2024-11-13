let orders = []; 
const getOrders = () => {
  return orders;
};

const addOrder = (order) => {
  const newOrder = {
    id: orders.length + 1, 
    ...order,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  orders.push(newOrder);
  return newOrder;
};

const updateOrder = (id, updatedData) => {
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex !== -1) {
    const updatedOrder = {
      ...orders[orderIndex],
      ...updatedData,
      updatedAt: new Date(), 
    };
    orders[orderIndex] = updatedOrder; 
    return updatedOrder;
  }
  return null; 
};

const deleteOrder = (id) => {
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex !== -1) {
    return orders.splice(orderIndex, 1)[0]; 
  }
  return null; 
};

module.exports = {
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
};