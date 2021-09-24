import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { removeProductToCart, userCart } from "../../Redux/Actions/cartActions";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import "./cart.css";
export const Cart = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { carts } = useSelector((state) => state.cartReducer);
  const history = useHistory();
  const location = useLocation();
  const [removed, setRemove] = useState(false);

  useEffect(() => {
    if (user?.user) {
      dispatch(userCart());
    }
  }, [dispatch, user?.user, location, removed]);

  const placeorder = () => {
    history.push("/placeOrder");
  };
  return (
    //
    <div className="cartM">
      {user?.user && carts?.cartItems?.length !== undefined ? (
        <>
          <div className="cart">
            <div className="cart__items">
              {carts?.cartItems?.map((cartItem) => (
                <div className="cartProduct" key={cartItem._id}>
                  <img
                    className="cartProduct__image"
                    alt=" cartItemimage"
                    src={cartItem?.image}
                  />

                  <div className="cartProduct__info">
                    <div className="removs">
                      <p className="cartProduct__title">{cartItem?.name}</p>

                      <Button
                        onClick={() => {
                          dispatch(
                            removeProductToCart(cartItem.productID, history)
                          );
                          setRemove((prev) => !prev);
                        }}
                      >
                        <DeleteForeverRoundedIcon />
                      </Button>
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
              <div className="heading">Cart Summary:</div>
              <div className="cartItems">
                <div className="cart__summing__header">
                  <h4> price</h4>
                  <h4>qty </h4>
                </div>
                {carts?.cartItems?.map((cartItem) => (
                  <div className="cart__summing__value" key={cartItem._id}>
                    <p>{cartItem?.price}</p>
                    <h6> {cartItem?.qty}</h6>
                  </div>
                ))}
              </div>
              {/* <div className="cartotal1">
                <h4>ShipingPrice</h4>

                <h4 className="cart__shipping_price">
                  {" "}
                  {carts?.cartItems?.length === 0 ? 0 : carts?.ShipingPrice}
                </h4>
                
              </div> */}
              <div className="cart__summing__header">
                <h4>ShipingPrice</h4>
                <p>
                  {" "}
                  {carts?.cartItems?.length === 0 ? 0 : carts?.ShipingPrice}
                </p>
              </div>
              <div className="cart__summing__header">
                <h4>Total</h4>
                <p>
                  {" "}
                  {carts?.cartItems?.length === 0 ? 0 : carts?.grandtotalPrice}
                </p>
              </div>
            </div>
          </div>
          {carts?.cartItems ? (
            <Button color="primary" onClick={placeorder}>
              {" "}
              place order
            </Button>
          ) : (
            ""
          )}
        </>
      ) : (
        <div className="noUser">
          {carts?.cartItems?.length === undefined ? (
            <p> add products to carts</p>
          ) : (
            <p>plz Login to add products to carts</p>
          )}
        </div>
      )}
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
