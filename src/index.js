import express from "express";
import productRouter from '../src/routes/product.router.js';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.use("api/products", productRouter);

const port =process.env.PORT || 3000;

app.listen(port, () => console.log(`Server Running on Port ${port}`));
