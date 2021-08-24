import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getproduct } from "../../Redux/Actions/productActions";
import { Button } from "@material-ui/core";
import { addProductToCart } from "../../Redux/Actions/cartActions";
const ProductDetails = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getproduct(id));
  }, []);

  const { product, isLoading } = useSelector((state) => state.productReducers);
  console.log(product);
  return (
    <div>
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
            onClick={() => dispatch(addProductToCart(product._id))}
          >
            addtocart
          </Button>
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(addProductToCart(product._id))}
          >
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
