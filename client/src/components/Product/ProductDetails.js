import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { getproduct } from "../../Redux/Actions/productActions";
import {
  Button,
  Chip,
  Icon,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { addProductToCart } from "../../Redux/Actions/cartActions";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./productDetails.css";
import { Rating } from "./Rating";
const ProductDetails = (props) => {
  const { id, rating } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getproduct(id));
  }, []);

  const { product, isLoading } = useSelector((state) => state.productReducers);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [values, setValues] = useState({
    comment: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className="productDetails">
      <div className="productDetails__img">
        <img src={product?.image} alt="" style={{ objectFit: "contain" }} />
      </div>
      <div className="productDetails__ details">
        <h4 className="productDetails__details_name">{product?.name}</h4>
        <h2 className="line"></h2>
        <div className="product__rating">
          {/* <Rating rating={product.rating} /> */}
          <div className="productDetails_reviews_count">
            <h5>Rating : </h5>
            <p className="productDetails__details_number">
              <Chip label={` ${product?.rating} ⭐`} />
            </p>
          </div>
          <div className="productDetails_reviews_count">
            <h5>Reviews : </h5>
            <p className="productDetails__details_number">
              {product?.numReviews}
            </p>
          </div>
        </div>
        <div className="productDetails__price">
          <p>Price : </p>
          <h5> $ {product?.price}</h5>
        </div>
        <p className="productDetails__taxes">Inclusive of all taxes</p>
        <div className="productDetails__insStock">
          <p>Procduct remaining: </p>
          <p>{product?.countInStock}</p>
        </div>
        <h6 className="productDetails__stockLogo">
          {product?.countInStock !== 0 ? "in stock" : "out of stock"}
        </h6>
        <div className="productDetails__options">
          <div className="productDetails__options_main">
            <div className="productDetails__options_qty">
              <h5>Qty: </h5>
              <h5>1</h5>
            </div>
            <Button
              variant="contained"
              className="productDetails__addto_button"
              onClick={() => {
                if (user?.user) {
                  console.log(product?._id);
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
              }}
              endIcon={<AddShoppingCartIcon />}
            >
              addtocart
            </Button>

            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px", width: "150px" }}
            >
              {"  "}
              Buy now
              {"   "}
            </Button>
          </div>
        </div>
        <div className="productDetails__specs_header">
          <h3> Product Details</h3>
          <h2 className="line2"></h2>
        </div>
        {product?.specs?.map((spec) => (
          <>
            <div className="productDetails__specs" key={spec._id}>
              <p className="productDetails__specs_h5">{spec?.specName}:</p>
              <p>{spec?.specValue}</p>
            </div>
          </>
        ))}
      </div>

      {/* */}
      <div className="productDetails_reivew">
        <h4>Reviews</h4>
        <form onSubmit={handleSubmit}>
          <InputLabel htmlFor="outlined-adornment-amount">
            Review Comment
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.comment}
            onChange={handleChange("comment")}
            label="comment"
          />
          <Button Type="submit">Submit</Button>
        </form>
        {product?.reviews?.map((review) => (
          <>
            <div className="productDetails__specs" key={review._id}>
              <p className="productDetails__specs_h5">{review?.name}:</p>
              <p>{review?.comment}</p>
              <p>{review?.rating}</p>
            </div>
          </>
        ))}
      </div>
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
    </div>
  );
};

export default ProductDetails;
{
  /* */
}
