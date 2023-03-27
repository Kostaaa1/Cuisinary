const express = require("express");
const router = express.Router();
const UserController = require("../controllers/auth");
const jwtCheck = require("../jwtCheck");

router.post("/createUser", UserController.addUser);
router.get("/:email", UserController.getUser);
router.get("/:id/getUserId", UserController.getUserId);
router.get("/:email/:id/getCustomCollection", UserController.getCustomCollection);
router.get("/:email/getSavedCollection", UserController.getSavedCollection);
router.get("/:email/valid", jwtCheck, UserController.validateUser);
router.post("/:email", UserController.addToFavorite);
router.post("/:email/deleteFavs", UserController.deleteFavorite);

module.exports = router;
