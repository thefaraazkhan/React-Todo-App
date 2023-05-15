const mongoose = require('mongoose');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const sa = process.env.DB_URL;

// console.log('your connection string ---:', sa);

mongoose
  .connect(sa, {
    // .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Mongo Database connection successful');
  })
  .catch((e) => {
    console.log('DB Connection Error');
  });
