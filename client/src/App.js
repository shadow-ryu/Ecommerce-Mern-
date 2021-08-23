import { getProducts } from "./Redux/Actions/productActions";
import React, { useEffect, useState } from "react";
import "./App.css";

import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignupOrSigninScreen from "./screens/signupScreen/SignupOrSigninScreen";
import Home from "./screens/HomeScreen/Homescreen";
import SellerDashBoard from "./screens/Seller DashBoard/SellerDashBoard";
import ProductForm from "./components/Product Form/ProductForm";
import ProductDetails from "./components/Product/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Navbar />
            <Home />
          </Route>
          <Route path="/admin" exact>
            <SellerDashBoard />
          </Route>
          <Route path="/admin/myproduct" exact>
            <SellerDashBoard sellerProducts />
          </Route>
          <Route path="/admin/editProduct/:id" exact>
            <SellerDashBoard Update />
          </Route>
          <Route path="/Product/:id" exact>
            <Navbar />
            <Home byId />
          </Route>
          {/* <Route path="/product/:id" exact>
            <Navbar />
            <ProductDetails />
          </Route> */}
          <Route path="/admin/orders" exact>
            <SellerDashBoard SellerOrder />
          </Route>
          <Route path="/auth" exact>
            <Navbar />
            <SignupOrSigninScreen />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
