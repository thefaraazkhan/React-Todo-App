const express = require("express");
const { Types } = require("mongoose");
const Router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary");
const Shops = require("../../src/models/Shops");
const Registers = require("../../src/models/AdminRegister");

require("../../handlers.js/cloudinary");

Router.get("/:id", async (req, res) => {
  try {
    const profile = await Registers.find({_id: req.params.id});
    return res.json(profile);
  } catch (error) {
    
  }
})
  

//admin shop registration
// set the storage engine
const ShopImageStorage = multer.diskStorage({});

const shopImageUpload = multer({
  storage: ShopImageStorage,

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/svg"
    ) {
      cb(null, true);
    } else {
      return cb("only .jpg, .jpeg, .png, .svg format allowed");
    }
  },

  limits: { fileSize: 1024 * 1024 }, //limit is 1MB
}).single("adminShopImage");

//post request to register a shop
Router.post("/", async (req, res) => {
  try {
    shopImageUpload(req, res, async (err) => {
      try {
        if (err?.code === "LIMIT_FILE_SIZE") {
          return res.json({
            errorMessage: "Image exceeded maximum size of 1MB",
          });
        } else if (err?.code === "LIMIT_UNEXPECTED_FILE") {
          return res.json({
            errorMessage: "Each shop can have only one image",
          });
        } else if (err) {
          return res.json(err);
        } else {
          const shopDetails = new Shops({
            adminId: req.body.adminId,
            address: req.body.address,
            landmark: req.body.landmark,
            city: req.body.city,
            pincode: req.body.pincode,
            phone: req.body.phone,
            products: req.body.products,
          });

          if (req.file) {
            
            const cl = async() => {
              try{
            cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
            }catch(err){
              console.log(err, "eeeeee")
            }
            }
            
            cl();
            
          }

          shopDetails.adminShopImage = cloudinaryResult == ""? "https://res.cloudinary.com/bilal8492/image/upload/v1619535127/shop_lnahag.png": cloudinaryResult.secure_url;

          await shopDetails
            .save()
            .then(
              res.json({ successMessage: "Profile is created successfully" })
            );
        }
      } catch (error) {
        console.log(err);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//patch request to edit a shop
Router.patch("/", async (req, res) => {
  try {          
    const shop = await Shops.findOne({ adminId: req.params.adminId });

    shopImageUpload(req, res, async (err) => {
      try {
        if (err?.code === "LIMIT_FILE_SIZE") {
          return res.json({
            errorMessage: "Image exceeded maximum size of 1MB",
          });
        } else if (err?.code === "LIMIT_UNEXPECTED_FILE") {
          return res.json({
            errorMessage: "Each shop can have only one image",
          });
        } else if (err) {
          return res.json(err);
        } else {
          const {
            address,
            landmark,
            city,
            pincode,
            phone,
            // adminShopImage
          } = req.body;
          // console.log(req.body)
          const query = {
            adminId: req.body.adminId,
          };
          

          if (req.file) {console.log(req.file, "file?????");
            
            const cl = async() => {
              try{
            cloudinaryResult = await cloudinary.uploader.upload(req.file.path);

            const updateProductDetails = {
              $set: {
                "address": address,
                "landmark": landmark,
                "city": city,
                "pincode": pincode,
                "phone": phone,
                "adminShopImage": cloudinaryResult.secure_url,
              },
            };

            await Shops.updateMany(query, updateProductDetails).then(
              res.json({ successMessage: "profile details is updated successfully" })
            );
            }catch(err){
              console.log(err, "eeeeee")
            }
            }
            cl();


            

            
          }

          // shopDetails.adminShopImage = cloudinaryResult.secure_url;


        if(!req.file){
          const updateProductDetails = {
            $set: {
              "address": address,
              "landmark": landmark,
              "city": city,
              "pincode": pincode,
              "phone": phone,
            },
          };

          await Shops.updateMany(query, updateProductDetails).then(
            res.json({ successMessage: "profile details is updated successfully" })
          );

        }


            
        }
      } catch (error) {
        console.log(err);
      }
      
    });
    
  } catch (error) {
    console.log(error);
  }
});



module.exports = Router;