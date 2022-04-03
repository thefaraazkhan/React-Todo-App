const mongoose = require('mongoose');

require('dotenv').config();

const sa = process.env.DB_URL;

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
