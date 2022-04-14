const { response, json } = require("express");
const express = require("express");
const { Types } = require("mongoose");
const Router = express.Router();
const multer = require("multer");
const Shops = require("../../src/models/Shops");

//read operation for user
//get all shops on home page
Router.get("/", async (req, res) => {
  try {
    await Shops.find().then((response) => res.json(response));
  } catch (error) {
    console.log(error);
  }
});

//Read operation for user
/* get a shop on the basis of shop id and destructure the products of that particular
   shop in frontend to show the products of that shop*/
//  view products to user on the basis of shopid
Router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(shopid)
    await Shops.findOne({ adminId: _id }).then((response) => res.json(response));
  } catch (error) {
    console.log(error);
  }
});

module.exports = Router;
