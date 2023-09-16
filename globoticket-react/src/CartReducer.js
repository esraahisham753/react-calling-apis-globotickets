const CartReducer = async (state = { cart: [] }, action) => {
  let cart = state.cart;
  switch (action.type) {
    case "refresh":
      return {
        ...state,
        cart: action.payload.cart,
      };
    default:
      return {
        ...state,
        cart: cart,
      };
  }
};

export default CartReducer;
