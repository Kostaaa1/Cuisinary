const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");
const { upload } = require("../middleware/multer");

// USER CRUD OPERATIONS
// PUT - UPDATE USER
router.post("/:email", UserController.updateUser);
router.post(
    "/:email/addImage",
    upload.single("file"),
    UserController.updateProfileImage
);
router.post("/:email/addCollection", UserController.addCollection);
router.post("/:email/addToCustom", UserController.addToCustomCollection);
router.post("/:email/:id/deleteCollection", UserController.deleteCollection);

module.exports = router;
