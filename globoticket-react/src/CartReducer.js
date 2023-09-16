const CartReducer = (state = { cart: [] }, action) => {
  let cart = state.cart;
  switch (action.type) {
    case "refresh":
      console.log("State after dispatch refresh", action.payload);
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return {
        ...state,
        cart: cart,
      };
  }
};

export default CartReducer;
