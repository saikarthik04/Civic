const mongoose = require('mongoose')
const { Order } = require('../model/orders');
const { Product } = require('../model/product');

// post Order
exports.newOrder = async (req, res) => {
    const order = new Order(req.body);
    order=new Order();
    

    // const OrderId = await Order.findOne({ orderId: req.body.orderId });
    const OrderedProductIsExists = await Product.find({ productName: req.body.productName });
    //const selectedSkuCode = await Product.find({ skucode: req.body.skus.skucode }, 'skucode');
    const selectedSku = await Product.find({ sku: req.body.skus }, 'sku');
    //const userIdAndOrderId = await Order.find({ $and: [{userId: req.body.userId}, {_id: req.body._id}] });

    try {
        var count = 0;
        if (OrderedProductIsExists !== null && selectedSku !== null) {

            if (!selectedSku) {
                return res.status(404).json({ error: 'SKU not found' });
            }

            const lastDoc = await Order.findOne({}, {}, { sort: { _id: -1 } }, (lastInsertedDoc) => {

                // Handle the success
                console.log('Last inserted document:');
                console.log(lastInsertedDoc);
            }
            );
            console.log(typeof (lastDoc._id) + " last id")
            count = parseInt(lastDoc._id);

             count = count + 1;
             order._id = count
            console.log(typeof (order._id) + " order id")
            console.log(order._id)
            order.status = "pending"
            order.paymentStatus = "pending";
            //console.log(order._id + " id");
            if (!order.subDocument) {
                order.subDocument = {};
            }
            if (!order.subSubDocument) {
                order.subSubDocument = {};
            }
            const Products = {
                productId: "647b25344929577ba6869f89",
                productName: "Navy blue",
                brand: "Nautica",
                subSubDocument: {
                    skus: [{
                        skucode: "Navy-Nautica-40-blue-299",
                        size: "Medium-40",
                        color: "Navy-blue",
                        price: "2999.00",
                        discount: "999.00",
                        final: "2000.00",
                        quantity: 2,
                        "imageURL": "https://cdn.shopify.com/s/files/1/0752/6435/products/IMG_0539_0eda87fc-7cb2-42ae-99e2-120436b12762_900x.jpg?v=1674801464"
                    }]
                }
            };

            order.subDocument.products.push(Products);
            // console.log(typeof (selectedSku.sku))
            // if (selectedSku.sku < Products.subSubDocument.skus.quantity) {
            //     return res.status(400).json({ error: 'Insufficient quantity available' });
            // }
            // const orderedQuantiy = order.subDocument.products.subSubDocument.skus;
            // const FinalProductQuntity = skusIsExists.quantity - orderedQuantiy;
            // const pId = order.subDocument.products.productId;
            // await Product.updateOne({_id:pId},{ $set: { quantity: FinalProductQuntity }},{ new: true });

            order.orderDate = Date.now();
            console.log(order);
            order.save();
            res.status(201).send({ "msg": "Order has created" })
        }

    }
    catch (error) {
        res.status(500).send(error);
        console.log(error);
        //send({ "error": "unable to create orders at this moment,Try after sometime" })
    }
}
