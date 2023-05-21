const express = require("express");
const router = express.Router();
const UserController = require("../controllers/auth");
const jwtCheck = require("../jwtCheck");

router.post("/:email/getUser", UserController.addUser);
// router.post("/:email/getUser", jwtCheck, UserController.addUser);
router.get("/:id/getUserId", UserController.getUserId);
router.get(
  "/:email/:id/getCustomCollection",
  UserController.getCustomCollection
);
router.get("/:email/getSavedCollection", UserController.getSavedCollection);
router.post("/:email", UserController.addToFavorite);
router.post("/:email/deleteFavs", UserController.deleteFavorite);

module.exports = router;
