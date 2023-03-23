const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/post");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
router.get('/', homeController.getIndex)
router.get('/tweet', homeController.getTweet)
router.get('/login', authController.getLogin)
router.get('/createaccount', authController.getCreateAccount)
router.get('/profile', ensureAuth, homeController.getProfile)
router.get('/feed', ensureAuth, homeController.getFeed)
// render latest post in the feed
//router.get('/feed', ensureAuth, homeController.feed)
router.get("/logout", authController.logout)
router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.post('/postTweet', postsController.createTweet)
module.exports = router;