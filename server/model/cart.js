const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [{
        productId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Product'
        },
        productName: {
            type: String,
            required: true
        },
        sku: [{
            size: {
              type: String,
            },
            color: {
                type:String
            },
            price: {
                type:mongoose.Types.Decimal128,
            },
            
            discount: {
                type:mongoose.Types.Decimal128
            },

            final: {
                type:mongoose.Types.Decimal128
            },
            quantity: {
                type:Number
            },
            imageURL: {
                type:String
            },
        }]

    }]
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = { Cart }