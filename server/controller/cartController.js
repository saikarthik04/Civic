const { Cart } = require('../model/cart');
const { Product } = require('../model/product');

// add products in cart

exports.addToCart =async( req, res ) =>{
    const cart = new Cart(req.body);
    const getProductbyId = await Product.find({$and: [{_id:req.body.products.productId},{sku: req.body.products.sku}]}).then(data =>{
        if (data === null) {
            console.log(getProductbyId + "product");
        }
    }); 
   
    // if(!cart.products.sku){
    //     cart.products.sku={};
    // }
    //console.log(cart.products.sku);
    if(getProductbyId!=null){

        cart.save();
        res.status(201).json(cart);
    }
    else{
        res.status(500).send({ "error": "unable to add to cart" })
    }
   
}

// update products in cart 

exports.updateCart = async(req, res)=>{



}