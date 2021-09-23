import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import {
  getproduct,
  ReviewProductById,
} from "../../Redux/Actions/productActions";
import {
  Button,
  Chip,
  Divider,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { addProductToCart } from "../../Redux/Actions/cartActions";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./productDetails.css";

const ProductDetails = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getproduct(id));
  }, [id, dispatch]);

  const { product } = useSelector((state) => state.productReducers);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [creview, setCreview] = useState(false);
  const [values, setValues] = useState({
    comment: "",
    rating: 0,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ReviewProductById(id, values, history));
    setCreview(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleReiew = () => {
    setCreview(!creview);
  };

  return (
    <div className="productDetails">
      <div className="productDetails__img">
        <img src={product?.image} alt="" style={{ objectFit: "contain" }} />
      </div>
      <div className="productDetails__ details">
        <h4 className="productDetails__details_name">{product?.name}</h4>
        <Divider variant="middle" />
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
        <Chip
          style={{ margin: "10px 0", backgroundColor: "skyblue" }}
          label={product?.countInStock !== 0 ? "In stock" : "Out of stock"}
        />

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
          <Divider variant="middle" />
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
        {creview ? (
          <div className="reviewForm">
            <form onSubmit={handleSubmit}>
              <h4 htmlFor="outlined-adornment-amount">Review Comment</h4>
              <div className="">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Comment
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  value={values.comment}
                  onChange={handleChange("comment")}
                  label="comment"
                  fullWidth
                />
              </div>
              <div className="">
                <InputLabel htmlFor="outlined-adornment-amount">
                  Rating
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  value={values.rating}
                  onChange={handleChange("rating")}
                  label="rating"
                />
              </div>

              <Button variant="contained" Type="submit">
                Submit
              </Button>
            </form>
            <Button onClick={handleReiew} style={{ margin: "10px 0" }}>
              Back
            </Button>
          </div>
        ) : (
          <>
            <Button
              onClick={handleReiew}
              style={{ margin: "10px 0", backgroundColor: "skyblue" }}
            >
              Write Review
            </Button>
          </>
        )}

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
