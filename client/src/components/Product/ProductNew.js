import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";
import { addProductToCart } from "../../Redux/Actions/cartActions";
import "./productNew.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
const ProductNew = (product) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const addtoCart = () => {
    if (user?.user) {
      console.log("user" + user?.user);
      dispatch(addProductToCart(product._id, history));
    } else {
      toast.error("plz login /signup to add to get", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className="main">
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
      <div className="product">
        <div className="product__image">
          <img src={product.image} alt="product " />
        </div>
        <div className="product__header">
          <p>{product.title}</p>
        </div>
        <div className="product__price__tag">
          <p>${product.price}</p>
        </div>
        <div className="product___rating">
          <div className="starrating">
            {product.rating === 1 ? (
              <StarIcon />
            ) : product.rating === 0.5 ? (
              <StarHalfIcon />
            ) : (
              <StarBorderIcon />
            )}
            {product.rating === 2 ? (
              <StarIcon />
            ) : product.rating === 1.5 ? (
              <StarHalfIcon />
            ) : (
              <StarBorderIcon />
            )}
            {product.rating === 3 ? (
              <StarIcon />
            ) : product.rating === 2.5 ? (
              <StarHalfIcon />
            ) : (
              <StarBorderIcon />
            )}
            {product.rating === 4 ? (
              <StarIcon />
            ) : product.rating === 3.5 ? (
              <StarHalfIcon />
            ) : (
              <StarBorderIcon />
            )}
            {product.rating === 5 ? (
              <StarIcon />
            ) : product.rating === 4.5 ? (
              <StarHalfIcon />
            ) : (
              <StarBorderIcon />
            )}
            <p>( {product.rating} )</p>
          </div>
        </div>

        <div className="buttons">
          <Button
            aria-label="share"
            onClick={() => {
              if (user?.user) {
                dispatch(addProductToCart(product.id, history));
              } else {
                toast.error("plz login /signup to add to get", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }}
          >
            <AddShoppingCartIcon></AddShoppingCartIcon>
          </Button>
          <Button
            onclick={() => history.push(`/Product/${product.id}`)}
            // variant="contained"
          >
            More info
            <NavigateNextIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductNew;
