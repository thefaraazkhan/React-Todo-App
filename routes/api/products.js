const express = require('express');
const { Types } = require('mongoose');
const Router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const Shops = require('../../src/models/Shops');
const User = require('../../src/models/AdminRegister');

require('../../handlers.js/cloudinary');

//Read operation for admin
/* get a shop on the basis of admin id and destructure the products of that particular
   shop in frontend to show the products of that shop in admin dashboard*/
//  view products to admin on the basis of admin id
//view product for admin
Router.get('/:id', async (req, res) => {
  try {
    const adminID = req.params.id;
    await Shops.findOne({ adminId: adminID }).then((response) =>
      res.json(response)
    );
  } catch (error) {
    console.log(error);
  }
});

Router.get('/user/:id', async (req, res) => {
  try {
    const adminID = req.params.id;
    await User.findOne({ _id: adminID }).then((response) => res.json(response));
  } catch (error) {
    console.log(error);
  }
});

// add new product by admin
// Set The Storage Engine
const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/svg'
    ) {
      cb(null, true);
    } else {
      return cb('only .jpg, .jpeg, .png, .svg format allowed');
    }
  },
  limits: { fileSize: 1024 * 1024 }, //max limit is 1MB
}).array('productImagesFiles', 4);

// put request to add new product
Router.put('/:id', async (req, res) => {
  try {
    upload(req, res, async (err) => {
      try {
        if (err?.code === 'LIMIT_FILE_SIZE') {
          return res.json({
            errorMessage: 'Image exceeded maximum size of 1MB',
          });
        } else if (err?.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.json({
            errorMessage: 'Each product can have maximum 4 images',
          });
        } else if (err) {
          return res.json(err);
        } else {
          const {
            productname,
            stock,
            productDescription,
            productCategory,
            city,
            expectedItem,
            adminId,
          } = req.body;

          var productImages = [];

          if (req.files) {
            await Promise.all(
              req.files.map(async (file, idx) => {
                try {
                  cloudinaryResult = await cloudinary.uploader.upload(
                    file.path
                  );
                  productImages.push(cloudinaryResult.secure_url);
                  // console.log(cloudinaryResult.secure_url);
                } catch (error) {
                  console.log(error);
                }
              })
            );
          }

          const product = {
            productname,
            productImages,
            stock,
            productDescription,
            city,
            productCategory,
            expectedItem,
            adminId,
          };
          const shop = await Shops.findOne({ adminId: req.params.id });
          shop.products.push(product);

          await shop.save().then(
            res.json({
              successMessage: 'product added successfully',
            })
          );
        }
      } catch (err) {
        res.json({
          errorMessage: 'Internal server error',
        });
      }
    });
  } catch (error) {
    console.log('error', error);
  }
});

//upadate operation for admin
//Edit product
Router.patch('/:adminId', async (req, res) => {
  try {
    const shop = await Shops.findOne({ adminId: req.params.adminId });

    const {
      productID,
      productname,
      editStock,
      productDescription,
      productCategory,
      city,
      expectedItem,
    } = req.body;

    var editProduct = {};
    shop.products.map((product) => {
      if (product.id === productID) {
        editProduct = product;
      }
    });
    var tmp = shop.products.filter(({ id }) => id == productID);
    console.log(tmp, editProduct);
    const query = {
      adminId: req.params.adminId,
      'products._id': editProduct._id,
    };

    const updateProductDetails = {
      $set: {
        'products.$.productname': productname,
        'products.$.stock': editStock,
        'products.$.productDescription': productDescription,
        'products.$.city': city,
        'products.$.productCategory': productCategory,
        'products.$.expectedItem': expectedItem,
      },
    };

    await Shops.updateMany(query, updateProductDetails).then(
      res.json({ successMessage: 'product details is updated successfully' })
    );
  } catch (err) {
    console.log(err);
  }
});

//delete operation for admin
//admin delete product
//get a particular shop on the basis of admin id and then get a particular productId from frontend in req.body and delete product
Router.delete('/:id', async (req, res) => {
  try {
    _id = req.params.id;
    const shop = await Shops.findOne({ adminId: _id });

    shop.products.map((product, idx) => {
      if (product.id === req.body.productId) {
        shop.products.splice(idx, 1);
      }
    });

    await shop.save().then(
      res.json({
        successMessage: 'product deleted successfully',
      })
    );
  } catch (error) {
    console.log('error occurs', error);
  }
});

module.exports = Router;
