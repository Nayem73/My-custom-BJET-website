// userReducer.js

const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case 'USER_FETCH_REQUEST':
      return { loading: true };
    case 'USER_FETCH_SUCCESS':
      return { loading: false, user: action.payload };
    case 'USER_FETCH_FAILED':
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
