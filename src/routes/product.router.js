import { Router } from "express";
import { PrismaClient } from "@prisma/client"
import {z} from "zod"
const prisma = new PrismaClient()
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
router.get("/", async(req, res) => {
    try {
        const product=await prisma.product.findMany();
        if(!product){
            res.status(404).json({success:false, data: "Products not found"})        
        }
        res.status(200).json({success:true, data: product})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, data: "A problem occurred with the server"})
    }
});

// Route for finding product by id
router.get("/:id", async(req, res)=>{
    const id=req.params.id;
    try {
        const product=await prisma.product.findUnique({
            where:{
                productId:id
            }
        })
        if(!product){
            res.status(404).json({success:false, data: "Product not found"})        
        }
        res.status(200).json({success:true, data: product})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, data: "A problem occurred with the server"}) 
    }
})


// Route for updating products by id
router.patch("/:id", validateProduct, async(req, res)=>{
    const id=req.params.id;
    const { productThumbnail,  productTitle, productDescription, productCost, onOffer}=req.body;
    try {
        const product=await prisma.product.update({
            where: { productId:id },
            data: {productThumbnail,productTitle,productDescription,productCost,onOffer}
        });
        res.status(200).json({success:true, data: "Product updated successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, data: "A problem occurred with the server"})  
    }
})

// Route for adding products
router.post("/",validateProduct, async(req, res)=>{
    try {
        const { productThumbnail,  productTitle, productDescription, productCost, onOffer}=req.body;
        const addProduct=await prisma.product.create({
            data:{
                productThumbnail,
                productTitle,
                productDescription,
                productCost,
                onOffer
            }
        });
        res.status(201).json({success:true, data: `You have successfully added ${addProduct.productTitle}`})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, data: "A problem occurred with the server"})
    }
});

// Route for deleting products by id
router.delete("/:id", async(req, res)=>{
    try {
       const id=req.params.id;
       const removeProduct=await prisma.product.delete({
        where:{productId:id}
       }) 
       if(!removeProduct){
        res.status(404).json({success:false, data: "Product not found"})        
        }
       res.status(200).json({success:true, data: "product has been successfully removed"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, data: "A problem occurred with the server"})
    }
})

export default router;
