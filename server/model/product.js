const mongoose = require('mongoose');
const { Category } = require('./category');
//product schema

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    productDesc: {
        type: String,
        required: true
    },
    sku: [
        {
            size: String,
            color: String,
            price: mongoose.Types.Decimal128,
            discount: mongoose.Types.Decimal128,
            final: mongoose.Types.Decimal128,
            quantity: Number,
            imageURL: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.String,
        ref: 'categoryName'
    },
    deliveryOptions: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }