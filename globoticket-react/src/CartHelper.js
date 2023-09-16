import UuidStore from "./UuidStore";

const cartUrl = "https://ndf395-3333.csb.app/cart";

async function _getCart() {
  const response = await fetch(cartUrl, {
    method: "GET",
    headers: {
      "X-SESSION-TOKEN": UuidStore.value,
    },
  });

  const cart = await response.json();
  return cart;
}

export function addCart(id) {
  return async function addCartThunk(dispatch, getState) {
    await fetch(cartUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value,
      },
      body: JSON.stringify({ id: id }),
    });

    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}

export function updateCart(id, quantity) {
  return async function updateCartThunk(dispatch, getState) {
    if (quantity === 0) {
      await fetch(cartUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-SESSION-TOKEN": UuidStore.value,
        },
        body: JSON.stringify({ id: id }),
      });
    } else {
      await fetch(cartUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-SESSION-TOKEN": UuidStore.value,
        },
        body: JSON.stringify({ id: id, quantity: quantity }),
      });
    }

    let cart = await _getCart();

    dispatch({ type: "refresh", payload: cart });
  };
}

export function deleteCart(id) {
  return async function deleteCartThunk(dispatch, getState) {
    await fetch(cartUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value,
      },
      body: JSON.stringify({ id: id }),
    });

    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}

export function clearCart() {
  return async function clearCartThunk(dispatch, getState) {
    await fetch(cartUrl, {
      method: "DELETE",
      headers: {
        "X-SESSION-TOKEN": UuidStore.value,
      },
    });

    let cart = await _getCart();
    dispatch({ type: "refresh", payload: cart });
  };
}
