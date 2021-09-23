import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// i had to complete it fast so i didnt style it  properly
import { myBills } from "../../Redux/Actions/orderAction";
import "./myorder.css";
const MyOrderBill = () => {
  const { Order, isLoading } = useSelector((state) => state.OrderReducers);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(myBills());
  }, [dispatch]);

  return (
    <div className="myorder">
      <div className="myorder___heading">
        <p>My Bills</p>
      </div>
      {user?.user ? (
        <>
          {isLoading === false &&
            Order.length !== 0 &&
            Order?.map((order) => (
              <>
                <div className="myorder__details" key={order._id}>
                  <div className="orderitem order_id">
                    <h4>Bill ID :</h4>
                    <p>{order._id}</p>
                  </div>
                  <div className="myorder___product1">
                    <div className="myorder___productDetails">
                      <div className="orderitemCart">
                        <h5>order Products</h5>
                        {order?.orderItems?.map((orderItem) => (
                          <div>
                            <div
                              className="searchResults1__Links"
                              key={orderItem?._id}
                            >
                              <img src={orderItem.image} alt="" />
                              <p>{orderItem?.name}</p>
                              <div
                                className="d"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <h4>Price :</h4>
                                <p>{orderItem?.price}</p>
                              </div>
                              <div
                                className="d"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <h4>qty :</h4>
                                <p>{orderItem?.qty}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="orderitem">
                        <h4>Order Deliver :</h4>
                        {order.isDelivered === false ? "no" : "yes"}
                      </div>

                      <div className="orderitem">
                        <h4>Payment Method:</h4>
                        <p>{order?.paymentMethod}</p>
                      </div>
                      <div className="orderitem">
                        <h4>Total amount:</h4>
                        <p>{order?.totalPrice}</p>
                      </div>

                      <div className="shippingAddress">
                        <div className="orderitem ">
                          <h4>Shipping Deatils :</h4>
                        </div>
                        <div className="orderitem">
                          <h4>Full Name :</h4>
                          <p>{order?.shippingAddress?.fullName}</p>
                        </div>

                        <div className="orderitem">
                          <h4>address :</h4>
                          <p>{order?.shippingAddress?.address}</p>
                        </div>
                        <div className="orderitem">
                          <h4>City :</h4>
                          <p>{order?.shippingAddress?.city}</p>
                        </div>
                        <div className="orderitem">
                          <h4>Postal Code :</h4>
                          <p>{order?.shippingAddress?.postalCode}</p>
                        </div>
                        <div className="orderitem">
                          <h4>Country :</h4>
                          <p>{order?.shippingAddress?.country}</p>
                        </div>
                        <div className="orderitem">
                          <h4>Contact_no :</h4>
                          <p>{order?.shippingAddress?.contact_no}</p>
                        </div>
                      </div>
                      <div className="orderitem">
                        <h4>Order Placed At :</h4>
                        <p>{order.createdAt}</p>
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

export default MyOrderBill;
