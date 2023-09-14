import UuidStore from "./UuidStore";

const CartReducer = async (state = { cart: [] }, action) => {
  let cart = state.cart;
  let response;

  switch (action.type) {
    case "add":
      await fetch("https://766mf7-3333.csb.app/cart", {
        method: "POST",
        headers: {
          X_SESSION_TOKEN: UuidStore.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: action.payload.id }),
      });
      response = await fetch("https://766mf7-3333.csb.app/cart", {
        method: "GET",
        headers: {
          X_SESSION_TOKEN: UuidStore.value,
        },
      });
      cart = await response.json();
      return {
        ...state,
        cart: cart,
      };

    case "update":
      if (action.payload.quantity === 0) {
        await fetch("https://766mf7-3333.csb.app/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            X_SESSION_TOKEN: UuidStore.value,
          },
          body: JSON.stringify({ id: action.payload.event_id }),
        });
      } else {
        await fetch("https://766mf7-3333.csb.app/cart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            X_SESSION_TOKEN: UuidStore.value,
          },
          body: JSON.stringify({
            id: action.payload.event_id,
            quantity: action.payload.quantity,
          }),
        });
      }

      response = await fetch("https://766mf7-3333.csb.app/cart", {
        method: "GET",
        headers: {
          X_SESSION_TOKEN: UuidStore,
        },
      });

      cart = response.json();
      return {
        ...state,
        cart: newCart,
      };

    case "delete":
      await fetch("https://766mf7-3333.csb.app/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          X_SESSION_TOKEN: UuidStore.value,
        },
        body: JSON.stringify({ id: action.payload.event_id }),
      });

      response = await fetch("https://766mf7-3333.csb.app/cart", {
        method: "GET",
        headers: {
          X_SESSION_TOKEN: UuidStore.value,
        },
      });

      cart = await response.json();

      return {
        ...state,
        cart: cart,
      };

    case "clear":
      await fetch("https://766mf7-3333.csb.app/cart", {
        method: "DELETE",
        headers: {
          X_SESSION_TOKEN: UuidStore.value,
        },
      });

      response = await fetch("https://766mf7-3333.csb.app/cart", {
        method: "GET",
        headers: {
          X_SESSION_TOKEN: UuidStore.value,
        },
      });

      cart = response.json();
      return {
        ...state,
        cart: cart,
      };
    default:
      return {
        ...state,
        cart: cart,
      };
  }
};

export default CartReducer;
