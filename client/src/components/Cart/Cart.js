import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userCart } from "../../Redux/Actions/cartActions";
import { getProducts } from "../../Redux/Actions/productActions";
import cartReducer from "./../../Redux/Reducers/cartReducer";

import "./cart.css";
export const Cart = () => {
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cartReducer);
  useEffect(() => {
    dispatch(userCart());
  }, [dispatch]);

  const removeFromBasket = () => {
    // remove the item from the basket
  };

  return (
    <div className="cartM">
      <div className="cart">
        <div className="cart__items">
          {carts?.cartItems?.map((cartItem) => (
            <div className="cartProduct">
              <img
                className="cartProduct__image"
                alt=" cartItemimage"
                src={cartItem?.image}
              />

              <div className="cartProduct__info">
                <div className="removs">
                  <p className="cartProduct__title">{cartItem?.name}</p>
                  <Button onClick={removeFromBasket}>Remove from Basket</Button>
                </div>

                <p className="cartProduct__price">
                  <small>$</small>
                  <strong>{cartItem?.price}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="cart__Total">
          <div className="cartItems">
            <div className="cart__summing__header">
              <h4> price</h4>
              <p>qty </p>
            </div>
            {carts?.cartItems?.map((cartItem) => (
              <div className="cart__summing__value">
                <p>{cartItem?.price}</p>
                <h6> {cartItem?.qty}</h6>
              </div>
            ))}
          </div>
          <div className="cartotal">
            <h4>total</h4>
            <h4> {carts?.grandtotalPrice}</h4>
          </div>
        </div>
      </div>
      <Button color="primary"> place order</Button>
    </div>
  );
};

// "qty": 1,
// "_id": "61248d0c3dc5e52c2cd19ebc",
// "productID": "6120ad66111f0b4328668db6",
// "name": "HP Pavilion Gaming ",
// "seller": "611b974223d1e54510888cf1",
// "image": "https://m.media-amazon.com/images/I/611VHOvjkES._SX679_.jpg",
// "price": 800,
// "totalprice": 800
