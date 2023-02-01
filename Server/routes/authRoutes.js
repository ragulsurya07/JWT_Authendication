const { login, register } = require("../AUTH/authControl");
const { checkUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", checkUser); 
router.post("/register", register);
router.post("/login", login);

module.exports = router;
