const mongoose = require('mongoose');
const skuSchema = mongoose.Schema({
  skus:[{
     skucode: {
      type: String,
      required: true
    },
    size: {
        type: String,
        required: true
      },
      color: {
        type: String,
        required: true
      },
      price: {
        type: mongoose.Types.Decimal128,
        required: true
      },
      discount: {
        type: mongoose.Types.Decimal128,
        required: true
      },
      final: {
        type: mongoose.Types.Decimal128,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      imageURL: {
        type: String,
        required: true
      }
    }]
});

const ProductsSchema = new mongoose.Schema({
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    productName: {
      type: mongoose.Schema.Types.String,
      ref: 'productName'
    },
    brand: {
      type: mongoose.Schema.Types.String,
      ref: 'brand'
    },
    subSubDocument: {
      type: skuSchema,
      required: true
    }
  }],

});


const orderSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  orderDate: {
    type: Date
  },  
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'refunded'],
  },
  shippingAddress: {
    type: mongoose.Schema.Types.Array,
    ref: 'shippingaddress'
  },
  billingAddress: {
    type: mongoose.Schema.Types.Array,
    ref: 'address'
  },
  subDocument: {
    type: ProductsSchema
  }

});

const Order = mongoose.model('Order', orderSchema);

module.exports = { Order };
