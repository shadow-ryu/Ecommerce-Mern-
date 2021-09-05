import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getproduct } from "../../Redux/Actions/productActions";
import { Button } from "@material-ui/core";
import { addProductToCart } from "../../Redux/Actions/cartActions";
import { useHistory } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const ProductDetails = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getproduct(id));
  }, []);

  const { product, isLoading } = useSelector((state) => state.productReducers);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <div>
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
      <>
        <div>
          <img src={product?.image} alt="" style={{ objectFit: "contain" }} />
        </div>
        <div>
          <h4>{product?.name}</h4>
          <h5>$ {product?.price}</h5>
          <p>{product?.countInStock}</p>
          <p>{product?._id}</p>
          <Button
            size="small"
            color="secondary"
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
          >
            addtocart
          </Button>
          <Button size="small" color="secondary">
            addtocart
          </Button>
          <a href="/">back</a>
          {product?.specs?.map((spec) => (
            <div key={spec._id}>
              <h6>
                {spec?.specName}:{spec?.specValue}
              </h6>
            </div>
          ))}
          <p>{product?.rating}</p>
        </div>
      </>
    </div>
  );
};

export default ProductDetails;
