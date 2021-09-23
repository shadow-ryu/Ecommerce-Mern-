import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { fd, myOrders } from "../../Redux/Actions/orderAction";
import "./myorder.css";
const MyOrder = () => {
  const { Order, isLoading } = useSelector((state) => state.OrderReducers);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <div className="myorder">
      <div className="myorder___heading">
        <p>My Orders</p>
      </div>
      {user?.user ? (
        <>
          {isLoading === false &&
            Order.length !== 0 &&
            Order?.map((order) => (
              <>
                <div className="myorder__details" key={order._id}>
                  <div className="orderitem order_id">
                    <h4>Order ID :</h4>
                    <p>{order._id}</p>
                  </div>
                  <div className="myorder___product">
                    <img
                      className="cartProduct__image"
                      alt=" cartItemimage"
                      src={order?.image}
                    />
                    <div className="myorder___productDetails">
                      <div className="orderitem">
                        <h4>Product name :</h4>
                        <p>{order.name}</p>
                      </div>
                      {/* <div className="orderitem">
                    <h4>Costumer ID :</h4>
                    <p>id</p>
                  </div> */}
                      <div className="orderitem">
                        <h4>Order Placed At :</h4>
                        <p>{order.createdAt}</p>
                      </div>
                      <div className="orderitem">
                        <h4>Qty :</h4>
                        <p>{order.qty}</p>
                      </div>
                      <div className="orderitem">
                        <h4>Order Cancelled :</h4>
                        <p>{order.cancelled === true ? "Yes" : "no"}</p>
                      </div>
                      <div className="orderitem">
                        <h4>Order Deliver :</h4>
                        {order.isDelivered === false ? "no" : "yes"}
                      </div>
                      {order.isDelivered === true ? (
                        <div className="orderitem">
                          <h4>Order Delivered at :</h4>
                          {order.updatedAt}
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="updatebU">
                        {order.cancelled === true ||
                        order.isDelivered === true ? (
                          ""
                        ) : (
                          <Button
                            variant="contained"
                            style={{ background: "#e41749 " }}
                            onClick={() => {
                              dispatch(fd(order._id, history));
                            }}
                          >
                            cancel order
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </>
      ) : (
        <h5>Plz Login to check your orders</h5>
      )}
    </div>
  );
};

export default MyOrder;
