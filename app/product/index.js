import express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import ProductsRoute from "../../app/product/routes"
import products from "./routes.js"
 
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mudiana-native');
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));
 
app.use(cors());
app.use(express.json());
app.use("/api",products);
 
app.listen(5000, ()=> console.log('Server up and running...'));