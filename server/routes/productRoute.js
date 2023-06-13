const{newProduct, getProductById, updateProduct, deleteProduct, getProducts} = require('../controller/productController')
const express =require('express')
const router = express.Router();

// post new product
router.post('/addproduct', newProduct)

// get products 
.get('/getproducts', getProducts)

// get Product by Id 

.get('/getproduct/:_id', getProductById)

// update product by _id

.put('/updateproduct/:_id',updateProduct)

// delete product by id

.delete('/deleteproduct/:_id', deleteProduct);

exports.router = router