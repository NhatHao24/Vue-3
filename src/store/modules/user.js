
const LOGIN_REQUEST = 'user/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'user/LOGIN_FAILURE';
const LOGOUT = 'user/LOGOUT';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});


const initialState = {
  user: null, 
  loading: false,  
  error: null, 
};


const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true, 
        error: null, 
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false, 
        user: action.payload, 
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false, 
        error: action.payload, 
      };
    case LOGOUT:
      return {
        ...state,
        user: null, 
      };
    default:
      return state; 
  }
};

export default userReducer;

export const getUser  = (state) => state.user.user; 
export const getLoadingStatus = (state) => state.user.loading; 
export const getError = (state) => state.user.error; 