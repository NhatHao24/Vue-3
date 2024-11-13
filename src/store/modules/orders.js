
const ADD_ORDER = 'orders/ADD_ORDER';
const REMOVE_ORDER = 'orders/REMOVE_ORDER';
const CLEAR_ORDERS = 'orders/CLEAR_ORDERS';

export const addOrder = (order) => ({
  type: ADD_ORDER,
  payload: order,
});

export const removeOrder = (orderId) => ({
  type: REMOVE_ORDER,
  payload: orderId,
});

export const clearOrders = () => ({
  type: CLEAR_ORDERS,
});

const initialState = {
  orders: [],
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case REMOVE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload),
      };
    case CLEAR_ORDERS:
      return {
        ...state,
        orders: [],
      };
    default:
      return state;
  }
};

export default ordersReducer;

export const getOrders = (state) => state.orders.orders;
export const getOrderCount = (state) => state.orders.orders.length;