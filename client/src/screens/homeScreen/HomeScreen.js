import { Grid, CircularProgress } from "@material-ui/core";
import "./home.css";

import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import React, { useState, useEffect } from "react";
import SellerDashBoard from "../Seller DashBoard/SellerDashBoard";
import { getProducts } from "../../Redux/Actions/productActions";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/Product/ProductDetails";

function Home(props) {
  const { byId } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const { products, isLoading } = useSelector((state) => state.productReducers);

  if (!products?.length && !isLoading) return "No products";
  return (
    <div className="home">
      <div className="home__container">
        {byId && id ? (
          <ProductDetails id={id} />
        ) : (
          <>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Grid container alignItems="stretch" spacing={3}>
                  {products?.map((product) => (
                    <Grid key={product._id}>
                      <Product
                        id={product._id}
                        title={product.name}
                        price={product.price}
                        rating={product.rating}
                        image={product.image}
                      />
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
