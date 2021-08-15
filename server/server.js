
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/users.js';
import {myCart} from './controllers/cartController.js'
import { isAdmin, checkAuth, isSellerOrAdmin } from './middleWare/roleAuth.js';
import productRouter from './routes/products.js';
import orderRouter from './routes/order.js';
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());

const PORT = process.env.PORT|| 5000;
app.use(bodyParser.json());
// monogo db connection
 //database
 const dbURL =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqyqk.mongodb.net/ecommerece?retryWrites=true&w=majority`; 

const db= mongoose.connect(dbURL, {  useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,})
 .then(result =>{ 
    app.listen(PORT, console.log(` server started and runing on http://localhost:${PORT}`));
    console.log("db connected successfully")})
 .catch(err => console.log(err));
 
 

mongoose.set('useFindAndModify', false);

// base route
app.get('/',  (req, res)=>{
    res.send(" home page is alive!")
})
//login/signup routes
app.use("/user", userRouter);
//product routes
app.use("/product", productRouter);


app.get("/cart",checkAuth ,myCart);
 
app.use("/order",orderRouter)

