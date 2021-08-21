
import { Grid, CircularProgress } from '@material-ui/core';
import "./home.css";

import { useDispatch, useSelector } from 'react-redux';
import Product from "../../components/Product/Product";
import React,{useState,useEffect} from 'react'
import SellerDashBoard from '../Seller DashBoard/SellerDashBoard';
import { getProducts } from '../../Redux/Actions/productActions';


function Home() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);
 
  const products = useSelector((state) => state.productReducers);

  return (
    <div className="home">
      <div className="home__container">
  
    
               
                          <Grid className container alignItems="stretch" spacing={3}>
                            {products.map((product) => (
                              <Grid>
                                    
                           
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
                   
              
          
    
         
   

       </div>
    </div>
  );
}

export default Home;

