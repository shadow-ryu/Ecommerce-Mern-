import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { userCart } from "./../../Redux/Actions/cartActions";
import { getmyaddress } from "../../Redux/Actions/UseraddressAction";
import { Button } from "@material-ui/core";
import { placeOrderFnc } from "../../Redux/Actions/orderAction";

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  shippingp: {
    fontWeight: 500,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function ReviewOrder() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cartReducer);
  const { newAddress } = useSelector((state) => state.newAddressReducer);
  const { address } = useSelector((state) => state.addressReducers);
  const { Order } = useSelector((state) => state.OrderReducers);
  console.log(Order);
  const { savePaynetMethod } = useSelector(
    (state) => state.savePaynetMethodReducer
  );

  const id = newAddress[0]?.addressId;

  let selectedAddress = address?.adress?.filter(function (el) {
    return el._id === id;
  });

  useEffect(() => {
    dispatch(userCart());

    dispatch(getmyaddress());
  }, [dispatch]);
  const PlaceOrderHandler = () => {
    if (savePaynetMethod[0]?.paymentMethod === "cash") {
      if (id) {
        let placeorderdetails = {
          isPaid: false,
          paymentMethod: "cash",
          shippingAddress: selectedAddress[0],
        };
        dispatch(placeOrderFnc(placeorderdetails));
      } else {
        let placeorderdetails = {
          isPaid: false,
          paymentMethod: "cash",
          shippingAddress: newAddress[0],
        };
        dispatch(placeOrderFnc(placeorderdetails));
      }
    } else {
      console.log("data");
    }
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {carts?.cartItems?.map((cartItem) => (
          <ListItem className={classes.listItem} key={cartItem.name}>
            <ListItemText primary={cartItem.name} secondary={cartItem.desc} />
            <Typography variant="body2">${cartItem.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Shipping Price" />
          <Typography variant="subtitle1" className={classes.shippingp}>
            $ {carts?.ShipingPrice}
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $ {carts?.grandtotalPrice}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          {id && selectedAddress ? (
            <>
              <Typography gutterBottom>
                {selectedAddress[0]?.fullName}
              </Typography>
              <Typography gutterBottom>
                {selectedAddress[0]?.address}
              </Typography>
              <Typography gutterBottom>{selectedAddress[0]?.city}</Typography>{" "}
              <Typography gutterBottom>
                {selectedAddress[0]?.country}
              </Typography>
              <Typography gutterBottom>
                {selectedAddress[0]?.contact_no}
              </Typography>
              <Typography gutterBottom>
                {selectedAddress[0]?.postalCode}
              </Typography>
            </>
          ) : (
            <>
              {newAddress[0] ? (
                <>
                  <Typography gutterBottom>
                    {newAddress[0]?.firstName} {newAddress[0]?.lastNames}
                  </Typography>
                  <Typography gutterBottom>{newAddress[0]?.address}</Typography>
                  <Typography gutterBottom>
                    {newAddress[0]?.city}
                  </Typography>{" "}
                  <Typography gutterBottom>{newAddress[0]?.country}</Typography>
                  <Typography gutterBottom>
                    {newAddress[0]?.contact_no}
                  </Typography>
                  <Typography gutterBottom>
                    {newAddress[0]?.postalCode}
                  </Typography>
                </>
              ) : (
                ""
              )}
            </>
          )}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment method
          </Typography>
          <Grid container>{savePaynetMethod[0]?.paymentMethod}</Grid>
        </Grid>
      </Grid>
      <Grid item container direction="column" xs={12} sm={6}>
        <Button
          variant="contained"
          onClick={PlaceOrderHandler}
          color="primary"
          className={classes.button}
        >
          place Order Order
        </Button>
      </Grid>
    </React.Fragment>
  );
}
