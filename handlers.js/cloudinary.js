var cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// cloudinary.uploader.upload("photo-15.jpg", function (error, result) {
//   console.log(result, error);
// });