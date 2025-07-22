const express = require("express");
const {
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleGetAllUsers,
  handleCreateNerUser,
} = require("../controller/user");
const router = express.Router();

// all users details and create new users
router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNerUser);

//one user details get, update and delete
router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
