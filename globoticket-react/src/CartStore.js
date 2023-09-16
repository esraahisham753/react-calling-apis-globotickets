import { createStore, applyMiddleware } from "redux";
import CartReducer from "./CartReducer";
import thunkMiddleware from "redux-thunk";

const thunkMid = applyMiddleware(thunkMiddleware);
const CartStore = createStore(CartReducer, thunkMid);

export default CartStore;
