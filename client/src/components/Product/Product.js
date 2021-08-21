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
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../Redux/Actions/productActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: "20px",
    height: 500,
  },
  media: {},

  avatar: {
    backgroundColor: red[500],
  },
  bottom: {
    marginBottom: 0,
  },
}));

const Product = (product) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <Card className={classes.root}>
      <CardHeader />

      <CardMedia className={classes.media}>
        <img
          src={product.image}
          alt=""
          width="100%"
          height="100%"
          style={{ objectFit: "contain" }}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textprimrary" component="h2">
          {product.title}
        </Typography>
        <Typography variant="body2" color="textprimrary" component="h6">
          $ {product.price}
        </Typography>
        <Typography variant="body2" color="textprimrary" component="p">
          {product.rating}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {product.edit ? (
          <>
            <IconButton className={classes.bottom} aria-label="edit">
              <Link to={`/admin/editProduct/${product.id}`}>
                <Typography variant="body2" color="textprimrary" component="p">
                  edit
                </Typography>
              </Link>

              <EditIcon />
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
          <>
            <IconButton aria-label="share">
              <AddShoppingCartIcon />
            </IconButton>
            <IconButton className={classes.bottom} aria-label="show more">
              <Typography variant="body2" color="textprimrary" component="p">
                More info
              </Typography>
              <NavigateNextIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};
export default Product;
