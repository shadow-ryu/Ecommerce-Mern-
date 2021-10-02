// SellerOrderList
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./list.css";
import { withStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Button, CircularProgress } from "@material-ui/core";

import {
  deleteuser,
  getAllseller,
  getAllUser,
  updateUserById,
} from "../../Redux/Actions/AuthActions";

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

function AllSellerDetails(props) {
  const { classes } = props;

  const { user, isLoading } = useSelector((state) => state.authReducers);
  const dispatch = useDispatch();
  const history = useHistory();
  const userD = JSON.parse(localStorage.getItem("profile"));
  if (user?.user.role === "user" || user === null) {
    history.push("/");
  }

  useEffect(() => {
    if (props.allSellers) {
      dispatch(getAllseller(history));
    }
    if (props.allUser) {
      dispatch(getAllUser(history));
    }
  }, [dispatch, history, props.allSellers, props.allUser]);

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
                <h4>
                  {props.allSellers ? "All Seller Details" : "All User Details"}
                </h4>
              </div>
              <div className="allorders">
                {isLoading === false &&
                  user.length != 0 &&
                  user?.map((user) => (
                    <div className="order " key={user._id}>
                      <h4 className="order__header">User Id: {user._id}</h4>
                      <div className="order___Details">
                        <div className="ordered__product">
                          <div className="orderitem">
                            <h4>
                              {props.allSellers ? "  Name :" : "  Name :"}{" "}
                            </h4>
                            <p>{user.name}</p>
                          </div>
                          <div className="orderitem">
                            <h4>
                              {props.allSellers ? "  Email :" : "  Email :"}{" "}
                            </h4>
                            <p>{user.email}</p>
                          </div>
                          <div className="orderitem">
                            <h4>
                              {props.allSellers ? "  Role :" : "  Role :"}{" "}
                            </h4>
                            <p>{user.role}</p>
                          </div>
                        </div>
                        {props.allSellers ? (
                          <>
                            <h4 className="order__header">Seller Details</h4>
                            <div className="ordered__product">
                              <div className="orderitem">
                                <h4>Brand Name :</h4>
                                <p>{user.sellerDetails?.name}</p>
                              </div>
                              <div className="orderitem">
                                <h4>Brand Logo :</h4>
                                <img
                                  src={user.sellerDetails?.logo}
                                  height="60"
                                  width="60"
                                  alt=""
                                />
                              </div>
                              <div className="orderitem">
                                <h4>shippingPrice :</h4>
                                <p>{user.sellerDetails?.shippingPrice}</p>
                              </div>
                              <div className="orderitem">
                                <h4>Seller info :</h4>
                                <p>{user.sellerDetails?.description}</p>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                        <div className="ordered__product">
                          {props.allSellers ? (
                            <div className="updatebU">
                              <Button
                                variant="contained"
                                style={{ background: "#a7ff83" }}
                                onClick={() =>
                                  dispatch(updateUserById(user._id, history))
                                }
                              >
                                Promote
                              </Button>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="updatebU">
                            <Button
                              variant="contained"
                              style={{ background: "red" }}
                              onClick={() => {
                                if (props.allSellers) {
                                  dispatch(deleteuser(user._id, history));
                                }
                                if (props.allUser) {
                                  dispatch(
                                    deleteuser(user._id, history, props.allUser)
                                  );
                                }
                              }}
                            >
                              erase
                            </Button>
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

AllSellerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllSellerDetails);
