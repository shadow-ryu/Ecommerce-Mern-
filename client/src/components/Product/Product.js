import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/productActions";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: "20px",
    height: 530,
  },
  media: {},

  avatar: {
    backgroundColor: red[500],
  },
  bottom: {
    marginBottom: 0,
  },
  actions: {
    margin: "20px",
  },
}));

const Product = (product, setAdded, added) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.root}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <CardHeader />

      <CardMedia className={classes.media}>
        <img
          src={product.image}
          alt=""
          width="100%"
          height="300px"
          style={{ objectFit: "contain" }}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="subtitle2">{product.title}</Typography>
        <Typography variant="subtitle2">$ {product.price}</Typography>
        <Typography variant="subtitle2">{product.rating}</Typography>
      </CardContent>
      <CardActions className={classes.actions} disableSpacing>
        {product.edit ? (
          <>
            <IconButton className={classes.bottom} aria-label="edit">
              <Link
                to={`/admin/editProduct/${product.id}`}
                style={{ display: "flex" }}
              >
                <Typography variant="subtitle2">edit</Typography>
                <EditIcon />
              </Link>
            </IconButton>
            <Button
              size="small"
              color="secondary"
              onClick={() => dispatch(deleteProduct(product.id))}
            >
              <DeleteIcon fontSize="small" /> &nbsp; Delete
            </Button>
          </>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};
export default Product;
