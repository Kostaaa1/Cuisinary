const express = require("express");
const router = express.Router();
const UserController = require("../controllers/auth");
const jwtCheck = require("../jwtCheck");

router.post("/", UserController.addUser);
router.get("/:email", UserController.getUser);
router.get("/:email/valid", jwtCheck, UserController.validateUser);
router.post("/:email", UserController.addToFavorite);
router.put("/:email/deleteFavs", UserController.deleteFavorite);
// router.post("/register", UserController.registerUser);
// router.post("/login", UserController.loginUser);

module.exports = router;
