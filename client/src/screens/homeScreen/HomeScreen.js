import { Grid, CircularProgress } from "@material-ui/core";
import "./home.css";

import { useDispatch, useSelector } from "react-redux";
import Product from "../../components/Product/Product";
import React, { useState, useEffect } from "react";
import SellerDashBoard from "../Seller DashBoard/SellerDashBoard";
import { getProducts } from "../../Redux/Actions/productActions";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/Product/ProductDetails";
import ProductNew from "../../components/Product/ProductNew";
import { useHistory, useLocation } from "react-router";
function Home(props) {
  const { byId } = props;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();
  if (user?.user.role === "admin" || user?.user.role === "seller") {
    history.push("/admin");
  }
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
                <Grid container spacing={5}>
                  {products?.map((product) => (
                    <div key={product._id}>
                      <Grid spacing={5} key={product._id}>
                        <ProductNew
                          key={product._id}
                          id={product._id}
                          title={product.name}
                          price={product.price}
                          rating={product.rating}
                          image={product.image}
                        />
                      </Grid>
                    </div>
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
