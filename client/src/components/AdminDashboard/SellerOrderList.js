// SellerOrderList
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./sellerorder.css";
import { withStyles } from "@material-ui/core/styles";

import Product from "../../components/Product/Product";

import { useDispatch, useSelector } from "react-redux";

import { Button, CircularProgress } from "@material-ui/core";
import { fetchsellerOrders } from "../../Redux/Actions/orderAction";

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

  const { Order, isLoading } = useSelector((state) => state.OrderReducers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchsellerOrders());
  }, [dispatch]);
  console.log(Order);
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
        <Grid className container alignItems="stretch" spacing={3}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <table id="customers">
                <tr>
                  <th>productID</th>
                  <th>Product name</th>
                  <th>Order placed at</th>
                  <th>Order Cancelled</th>
                  <th>Order Delivered</th>
                  <th>Order update</th>
                </tr>

                {Order?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.createdAt}</td>
                    <td>{product.cancelled === "true " ? "Yes" : "no"}</td>
                    <td>{product.isDelivered}</td>
                    <td>
                      <Button>edit</Button>
                    </td>
                  </tr>
                ))}
              </table>
            </>
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
