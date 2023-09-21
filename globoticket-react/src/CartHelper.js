import UuidStore from "./UuidStore";
import { mutate } from "swr";

const cartUrl = "https://ndf395-3333.csb.app/cart";

export function addCart(id) {
  fetch(cartUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-SESSION-TOKEN": UuidStore.value,
    },
    body: JSON.stringify({ id: id }),
  }).then(() => {
    mutate(cartUrl);
  });
}

export function updateCart(id, quantity) {
  let resPromise;

  if (quantity === 0) {
    resPromise = fetch(cartUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value,
      },
      body: JSON.stringify({ id: id }),
    });
  } else {
    resPromise = fetch(cartUrl, {
      method: "PATCH",
      body: JSON.stringify({ id: id, quantity: quantity }),
      headers: {
        "Content-Type": "application/json",
        "X-SESSION-TOKEN": UuidStore.value,
      },
    });
  }

  resPromise.then(() => {
    mutate(cartUrl);
  });
}

export function deleteCart(id) {
  fetch(cartUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-SESSION-TOKEN": UuidStore.value,
    },
    body: JSON.stringify({ id: id }),
  }).then(() => {
    mutate(cartUrl);
  });
}

export function clearCart() {
  fetch(cartUrl, {
    method: "DELETE",
    headers: {
      "X-SESSION-TOKEN": UuidStore.value,
    },
  }).then(() => {
    mutate(cartUrl);
  });
}
