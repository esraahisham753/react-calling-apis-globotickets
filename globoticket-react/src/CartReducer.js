import UuidStore from "./UuidStore";

const CartReducer = async (state = { cart: [] }, action) => {
  let cart = state.cart;
  let response;

  switch (action.type) {
    case "add":
      console.log("Add id", action.payload.id);
      // prettier-ignore
      await fetch("https://ndf395-3333.csb.app/cart", {
        method: "POST",
        headers: {
          "X_SESSION_TOKEN": UuidStore.value,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: action.payload.id }),
      });
      // prettier-ignore
      response = await fetch("https://ndf395-3333.csb.app/cart", {
        method: "GET",
        headers: {
          "X_SESSION_TOKEN": UuidStore.value,
        },
      });
      cart = await response.json();
      return {
        ...state,
        cart: cart,
      };

    case "update":
      if (action.payload.quantity === 0) {
        // prettier-ignore
        await fetch("https://ndf395-3333.csb.app/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X_SESSION_TOKEN": UuidStore.value,
          },
          body: JSON.stringify({ id: action.payload.event_id }),
        });
      } else {
        // prettier-ignore
        await fetch("https://ndf395-3333.csb.app/cart", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X_SESSION_TOKEN": UuidStore.value,
          },
          body: JSON.stringify({
            id: action.payload.event_id,
            quantity: action.payload.quantity,
          }),
        });
      }
      // prettier-ignore
      response = await fetch("https://ndf395-3333.csb.app/cart", {
        method: "GET",
        headers: {
          "X_SESSION_TOKEN": UuidStore,
        },
      });

      cart = response.json();
      return {
        ...state,
        cart: cart,
      };

    case "delete":
      // prettier-ignore
      await fetch("https://ndf395-3333.csb.app/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X_SESSION_TOKEN": UuidStore.value,
        },
        body: JSON.stringify({ id: action.payload.event_id }),
      });
      // prettier-ignore
      response = await fetch("https://ndf395-3333.csb.app/cart", {
        method: "GET",
        headers: {
          "X_SESSION_TOKEN": UuidStore.value,
        },
      });

      cart = await response.json();

      return {
        ...state,
        cart: cart,
      };

    case "clear":
      // prettier-ignore
      await fetch("https://ndf395-3333.csb.app/cart", {
        method: "DELETE",
        headers: {
          "X_SESSION_TOKEN": UuidStore.value,
        },
      });
      // prettier-ignore
      response = await fetch("https://ndf395-3333.csb.app/cart", {
        method: "GET",
        headers: {
          "X_SESSION_TOKEN": UuidStore.value,
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
