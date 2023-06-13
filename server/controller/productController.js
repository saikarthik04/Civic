const { Category } = require('../model/category');
const  {Product}  = require('../model/product');


// post Product
  exports.newProduct = async (req, res) => {
    const product = new Product(req.body);
    const pName = await Product.findOne({ productName: req.body.productName }, 'productName');

    try {
        if (pName !== null || '') {
            res.status(409).send('{ "msg": "Product already exists" }')
        }
        console.log(product);
        product.save();
        res.status(201).send({ "msg": "Product added sucessfully" })

    } catch (error) {
        res.status(500).send({ "error": "unable to add product" })
    }

}

// get products

exports.getProducts = async (req, res) => {
    try {
        await Product.find().then(data => {
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).send({ "error": "unable to retrieve Products" });
    }
}

// get product by Id 


exports.getProductById = async (req, res) => {
    try {
        const pId = req.params._id;
        await Product.findById({_id:pId}).then(data => {
            if (data === null) {
                res.status(404).send({ 'msg': "product not found" });
            }
            res.status(200).json(data)
        })

    } catch (error) {
        res.status(500).send({ "error": "unable to retrieve product" });
    }
}

// update product by Id

exports.updateProduct = async (req, res) => {
    try {
        var pId = req.params._id;

        const IscategoryExists = await Category.findOne({ categoryName: req.body.category });
        console.log("aaaaaaaaaaaa"+IscategoryExists)
        await Product.findOneAndUpdate({ _id:pId }, req.body, { new: true }).then(data => {
            if (data != null && IscategoryExists !== null) {
                console.log("bbbbbbbbbbb"+data.category)
                console.log("cccccccccc"+IscategoryExists); 
                res.status(200).send({ "msg": "Product has updated successfully" })
               
            }
            else res.status(404).send({ "msg": "Product not found to update" });
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({ "error": "unable to update Product" });
    }


}


//delete product

exports.deleteProduct = async (req, res) => {
    try {
        await User.findOneAndDelete({ _id: req.params._id }).then(data => {
            console.log(data);
            if (!data) {
                res.status(404).send({ "msg": "product not found to delete" })
            }
            res.status(200).send({ "msg": "product has deleted successfully" })
        })

    } catch (error) {
        res.status("500").send({ "error": "unable to found or delete product" })
    }
}



