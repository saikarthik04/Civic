const express = require('express');
const { conn } = require('./db/db');
const  userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute')
const  productRoute  = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute')
const categoryRoute= require('./routes/CategoryRoute');
const cartRoute = require('./routes/cartRoute');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
conn();


const base = "/api";
//HOME ROUTE
app.get(base, async (req, res) => res.send("hello you are in index page"));


// END-POINT
app.use(base + '/user',userRoute.router);
app.use(base+'/auth', authRoute.router);
app.use(base + '/product',productRoute.router );
app.use(base+ '/order',orderRoute.router);
app.use(base+'/category',categoryRoute.router);
app.use(base+"/cart", cartRoute.router)


const port = process.env.PORT || 8082;

app.listen(port, () => { console.log(`server running on port ${port}`) });


// {
//     "userName":"karthik",
//     "email":"saikarthik@gamil.com",
//     "phoneNo":"9736284610",
//     "password":"karthik@0421",
//     "confirmPassword":"karhtik@0421",
//     "address": {
//       "flatNo":"161/1",
//       "area":"sainilpuri",
//       "pincode":"500062",
//       "city":"hyderabad",
//       "state":"telangana"
//     }
//   }