const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
//const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
router.get('/', homeController.getIndex)
router.get('/createaccount', authController.getCreateAccount)
router.get('/profile', ensureAuth, authController.getProfile)
router.post('/createaccount', authController.postCreateAccount)
module.exports = router;