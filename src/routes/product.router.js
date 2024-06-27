import { Router } from "express";
import {z} from "zod"
import { addProduct, getProductId, getProducts, removeProduct, updateProduct } from "../controllers/product.controller.js";
const router = Router();

// zod product schema
const productSchema= z.object({
    productThumbnail: z.string().url(),
    productTitle: z.string(),
    productDescription: z.string(),
    productCost: z.number().positive(),
    onOffer:z.boolean(),
});
// validation of Zod product schema
const validateProduct=(req, res, next)=>{
    try{
        productSchema.parse(req.body);
        next();
    }catch(error){
        let received=error.errors[0].received;
        let expected=error.errors[0].expected;
        if (received !== expected) { 
            res.status(400).json({ success: false, error: `You have entered a ${received} instead of a ${expected}` });  
        }else{
            res.status(400).json({ success: false, error: error.errors[0].message});  
        }
    }
}


// Route for getting all products
router.get("/", getProducts);

// Route for finding product by id
router.get("/:id", getProductId)


// Route for updating products by id
router.patch("/:id", validateProduct, updateProduct)

// Route for adding products
router.post("/",validateProduct, addProduct);

// Route for deleting products by id
router.delete("/:id",removeProduct)

export default router;
