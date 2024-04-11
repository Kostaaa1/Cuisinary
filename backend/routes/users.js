const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");
const { upload } = require("../middleware/multer");

// USER CRUD OPERATIONS
// GET - GET
router.get("/:userId/:id/getPersonalRecipe", UserController.getPersonalRecipe);

// PUT - UPDATE USER
router.post("/:email", UserController.updateUser);
router.post(
  "/:email/addImage",
  upload.single("file"),
  UserController.updateProfileImage
);
router.post("/:email/newCollection", UserController.newCollection);
router.post("/:email/:id/editCollection", UserController.editCollection);
router.post("/:email/:id/deleteCollection", UserController.deleteCollection);
router.post("/:email/addToCustom", UserController.addToCustomCollection);
router.post(
  "/:email/addPersonalRecipe",
  upload.single("image"),
  UserController.addPersonalRecipe
);
router.delete(
  "/:email/:id/deletePersonalRecipe",
  UserController.deletePersonalRecipe
);

module.exports = router;
