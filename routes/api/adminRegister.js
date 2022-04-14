const express = require("express");
const {
  signupValidator,
  validatorResult,
} = require("../../middlewares/Validator");
const { signupController, getAdminById } = require("../../controllers/auth");
const Router = express.Router();

Router.get('/:id', getAdminById);
Router.post("/", signupValidator, validatorResult, signupController);

module.exports = Router;
