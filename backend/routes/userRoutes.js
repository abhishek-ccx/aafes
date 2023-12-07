const express = require("express");
const { signup, login } = require("./../controllers/authController");
const { getUsers,getUserRole, updateUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/").get(getUsers)
router.route("/:id").patch(updateUser).delete(deleteUser)
router.route("/getrole").post(getUserRole)

module.exports = router;
