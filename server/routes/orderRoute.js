const express =require('express');
const { newOrder } = require('../controller/orderController');
const router = express.Router();


// create order
router.post('/', newOrder);

exports.router =router;