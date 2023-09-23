import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Eventlist from "./Eventlist";
import Shoppingcart from "./Shoppingcart";
import Confirmation from "./Confirmation";
import ErrorBoundary from "./ErrorBoundary";
import { Suspense } from "react";

function App() {
  return (
    <Router>
      <Header />
      <ErrorBoundary fallback={<div className="mt-5 ms-5">Error!</div>}>
        <Suspense fallback={<div className="mt-5 ms-5">Loading Data ...</div>}>
          <Route exact path="/" component={Eventlist} />
        </Suspense>
      </ErrorBoundary>
      <Route exact path="/cart" component={Shoppingcart} />
      <Route exact path="/confirm" component={Confirmation} />
    </Router>
  );
}

export default App;
