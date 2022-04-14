const express = require("express");
const Router = express.Router();
const {
  signinValidator,
  validatorResult,
} = require("../../middlewares/Validator");
const { signinController } = require("../../controllers/auth");

Router.post("/", signinValidator, validatorResult, signinController);

module.exports = Router;
