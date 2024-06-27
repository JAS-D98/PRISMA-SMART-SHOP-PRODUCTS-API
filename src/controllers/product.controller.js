import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const getProducts=async(req, res) => {
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
}

export const getProductId=async(req, res)=>{
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
}

export const updateProduct=async(req, res)=>{
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
}

export const addProduct=async(req, res)=>{
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
}

export const removeProduct=async(req, res)=>{
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
}