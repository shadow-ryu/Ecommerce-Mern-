import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { removeProductToCart, userCart } from "../../Redux/Actions/cartActions";

export const Buynow = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const { carts } = useSelector((state) => state.cartReducer);
  const history = useHistory();
  const location = useLocation();
  const [removed, setRemove] = useState(false);
  const buy = "buy";
  useEffect(() => {
    if (user?.user) {
      dispatch(userCart());
    }
  }, [dispatch, user?.user, location, removed]);

  const placeorder = () => {
    history.push("/placeOrder");
  };
  return (
    <div>
      {user?.user && carts?.cartItems?.length !== undefined ? (
        <>
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
                        removeProductToCart(cartItem.productID, history, buy)
                      );
                      setRemove((prev) => !prev);
                    }}
                  >
                    Remove item
                  </Button>
                </div>

                <p className="cartProduct__price">
                  <small>$</small>
                  <strong>{cartItem?.price}</strong>
                </p>
              </div>
            </div>
          ))}
          <Button onClick={placeorder}> Place Order</Button>
        </>
      ) : (
        "  select a Product"
      )}
    </div>
  );
};
