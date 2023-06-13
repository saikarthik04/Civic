const mongoose = require('mongoose');

const conn = async () => {
  await mongoose.connect(

    process.env.MongoDbUrl,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).then((data) => {
    try {
      console.log(`conneted to ${data.connection.host} `+`${data.connection.port}`);
    } catch (err) {
      console.log(err);
    }
  
})};

module.exports ={conn};
