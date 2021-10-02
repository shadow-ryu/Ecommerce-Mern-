import React from "react";
import "./App.css";

// import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SignupOrSigninScreen from "./screens/signupScreen/SignupOrSigninScreen";
import Home from "./screens/HomeScreen/Homescreen";
import SellerDashBoard from "./screens/Seller DashBoard/SellerDashBoard";

import { Cart } from "./components/Cart/Cart";
import Checkout from "./components/Shipping&Checkout/Checkout";
import MyOrder from "./components/MyOrders/MyOrder";
import { MyProfile } from "./components/Myprofile/MyProfile";
import MyOrderBill from "./components/MyOrders/MyOrderBill";
import { Buynow } from "./components/Shipping&Checkout/Buynow";
import Footer from "./components/Navbar/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/auth" exact>
            <Navbar />
            <SignupOrSigninScreen />
          </Route>
          <Route path="/admin" exact>
            <SellerDashBoard />
          </Route>
          <Route path="/admin/myproduct" exact>
            <SellerDashBoard sellerProducts />
          </Route>
          <Route path="/admin/myProfile" exact>
            <SellerDashBoard sellerProfile />
          </Route>
          <Route path="/admin/editProduct/:id" exact>
            <SellerDashBoard Update />
          </Route>
          <Route path="/admin/sellerOrderById/:id" exact>
            <SellerDashBoard orderByid />
          </Route>
          <Route path="/admin/orders" exact>
            <SellerDashBoard SellerOrder />
          </Route>
          <Route path="/admin/allsellerD" exact>
            <SellerDashBoard allSellers />
          </Route>{" "}
          <Route path="/admin/alluserD" exact>
            <SellerDashBoard allUser />
          </Route>
          <Route path="/" exact>
            <Navbar />
            <Home />
            <Footer />
          </Route>
          <Route path="/Product/:id" exact>
            <Navbar />
            <Home byId />
            <Footer />
          </Route>
          <Route path="/mycart" exact>
            <Navbar />
            <Cart />
          </Route>
          <Route path="/placeOrder" exact>
            <Navbar hideSearch={"hideSearch"} />
            <Checkout />
          </Route>
          <Route path="/buyNow" exact>
            <Navbar hideSearch={"hideSearch"} />
            <Buynow />
          </Route>
          <Route path="/myOrder" exact>
            <Navbar hideSearch={"hideSearch"} />
            <MyOrder />
            <Footer />
          </Route>
          <Route path="/myBills" exact>
            <Navbar hideSearch={"hideSearch"} />
            <MyOrderBill />
          </Route>
          <Route path="/myProfile" exact>
            <Navbar hideSearch={"hideSearch"} />
            <MyProfile />
            <Footer />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
