import UuidStore from "./UuidStore";
import axios from "axios";

const cartUrl = "https://ndf395-3333.csb.app/cart";

async function _getCart() {
  const response = await axios.get(cartUrl, {
    headers: {
      "X-SESSION-TOKEN": UuidStore.value,
    },
  });

  const cart = response.data;
  return cart;
}

export function addCart(id) {
  return async function addCartThunk(dispatch, getState) {
    await axios.post(
      cartUrl,
      { id: id },
      {
        headers: {
          "Content-Type": "application/json",
          "X-SESSION-TOKEN": UuidStore.value,
        },
      },
    );

    let cart = await _getCart();
    console.log("State before dispatch refresh", cart);
    dispatch({ type: "refresh", payload: cart });
  };
}

export function updateCart(id, quantity) {
  return async function updateCartThunk(dispatch, getState) {
    if (quantity === 0) {
      await axios.delete(cartUrl, {
        headers: {
          "Content-Type": "application/json",
          "X-SESSION-TOKEN": UuidStore.value,
        },
        data: { id: id },
      });
    } else {
      await axios.patch(
        cartUrl,
        { id: id, quantity: quantity },
        {
          headers: {
            "Content-Type": "application/json",
            "X-SESSION-TOKEN": UuidStore.value,
          },
        },
      );
    }

    let cart = await _getCart();

    dispatch({ type: "refresh", payload: cart });
  };
}

export function deleteCart(id) {
  return async function deleteCartThunk(dispatch, getState) {
    await axios.delete(cartUrl, {
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value,
      },
      data: { id: id },
    });

    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}

export function clearCart() {
  return async function clearCartThunk(dispatch, getState) {
    await axios.delete(cartUrl, {
      headers: {
        "X-SESSION-TOKEN": UuidStore.value,
      },
    });

    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}
