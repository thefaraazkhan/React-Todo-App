const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../../controllers/auth");

const router = require("express").Router();

// router.post("/login", login);
// router.post("/register", register);
router.get("/:id", getAllUsers);
// router.post("/setavatar/:id", setAvatar);
// router.get("/logout/:id", logOut);

module.exports = router;
