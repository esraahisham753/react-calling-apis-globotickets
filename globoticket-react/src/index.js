import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import { Server } from "miragejs";
import { Provider } from "react-redux";
import ErrorStore from "./ErrorStore";

/*new Server({
  routes() {
    this.get("https://ndf395-3333.csb.app/events", () => [
      {
        id: 1,
        artist: "Container Enthusiasm",
        name: "Talk Docker to Me Tour",
        date: "2021-10-01T19:00:00",
        price: 49.99,
        imgUrl: "logos/Container-Enthusiasm-TalkDocker-To-Me.png",
      },
      {
        id: 2,
        artist: "Digital Cowboys",
        name: "Binary Bovine Tour",
        date: "2021-11-01T19:30:00",
        price: 59.99,
        imgUrl: "logos/DigitalCowboys_BinaryBovine.png",
      },
    ]);
  },
});*/

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ErrorStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
