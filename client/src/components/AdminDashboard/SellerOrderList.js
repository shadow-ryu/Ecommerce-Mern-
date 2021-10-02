// SellerOrderList
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./sellerorder.css";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Button, CircularProgress } from "@material-ui/core";
import {
  fetchsellerOrders,
  updatellerOrderById,
} from "../../Redux/Actions/orderAction";

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden",
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: "block",
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: "40px 16px",
  },
});

function SellerOrderList(props) {
  const { classes } = props;

  const { Order, isLoading, update } = useSelector(
    (state) => state.OrderReducers
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  if (user?.user.role === "user" || user === null) {
    history.push("/");
  }
  useEffect(() => {
    dispatch(fetchsellerOrders(history));
  }, [dispatch, history]);

  return (
    <Paper className={classes.paper}>
      <AppBar
        className={classes.searchBar}
        position="static"
        color="default"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center"></Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Grid container alignItems="stretch" spacing={3}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid>
              <div className="orderheading">
                <h4>Orders</h4>
              </div>
              <div className="allorders">
                {isLoading === false &&
                  Order.length != 0 &&
                  Order?.map((product) => (
                    <div className="order " key={product._id}>
                      <h4 className="order__header">orderid: {product._id}</h4>
                      <div className="order___Details">
                        <div className="ordered__product">
                          <div className="orderitem">
                            <h4>Costumer ID :</h4>
                            <p>{product.costumer}</p>
                          </div>

                          <div className="orderitem">
                            <h4>Product ID :</h4>
                            <p>{product.productID}</p>
                          </div>
                          <div className="orderitem">
                            <h4>Product Name :</h4>
                            <p>{product.name}</p>
                          </div>
                          <div className="orderitem">
                            <h4>Order Placed At :</h4>
                            <p>{product.createdAt}</p>
                          </div>
                          <div className="orderitem">
                            <h4>Order Cancelled :</h4>
                            <p>{product.cancelled === true ? "Yes" : "no"}</p>
                          </div>
                          <div className="orderitem">
                            <h4>Order Deliver :</h4>
                            <p>
                              {product.isDelivered === false ? "no" : "yes"}
                            </p>
                          </div>
                          <div className="updatebU">
                            {(product.cancelled === false &&
                              product.isDelivered === false) ||
                            product.isDelivered === false ? (
                              <Button
                                variant="contained"
                                style={{ background: "#a7ff83" }}
                                onClick={() =>
                                  dispatch(
                                    updatellerOrderById(product._id, history)
                                  )
                                }
                              >
                                Mark Delivered
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Paper>
  );
}

SellerOrderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SellerOrderList);
