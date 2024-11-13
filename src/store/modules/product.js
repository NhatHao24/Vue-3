
const FETCH_PRODUCTS_REQUEST = 'products/FETCH_PRODUCTS_REQUEST'; 
const FETCH_PRODUCTS_SUCCESS = 'products/FETCH_PRODUCTS_SUCCESS'; 
const FETCH_PRODUCTS_FAILURE = 'products/FETCH_PRODUCTS_FAILURE'; 
const ADD_PRODUCT = 'products/ADD_PRODUCT'; 
const REMOVE_PRODUCT = 'products/REMOVE_PRODUCT'; 

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const removeProduct = (productId) => ({
  type: REMOVE_PRODUCT,
  payload: productId,
});


const initialState = {
  products: [], 
  loading: false, 
  error: null, 
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true, 
        error: null, 
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false, 
        products: action.payload, 
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, 
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload], 
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload), 
      };
    default:
      return state; 
  }
};

export default productReducer;


export const getProducts = (state) => state.products.products; 
export const getProductById = (state, productId) => 
  state.products.products.find(product => product.id === productId); 
export const getLoadingStatus = (state) => state.products.loading; 
export const getError = (state) => state.products.error; 