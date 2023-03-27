const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const editController = require("../controllers/edit");
const postsController = require("../controllers/post");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
router.get('/', homeController.getIndex)
router.get('/tweet', homeController.getTweet)
router.get('/login', authController.getLogin)
router.get('/createaccount', authController.getCreateAccount)
router.get('/profile', ensureAuth, homeController.getProfile)
router.get('/profile/:user',ensureAuth, homeController.getUser)
router.get('/feed', ensureAuth, homeController.getFeed)
//router.get('/comment/:id',ensureAuth, homeController.comment)
router.get('/:user/:id', ensureAuth, homeController.getComment)
router.get("/logout", authController.logout)


router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.post('/postTweet', postsController.createTweet)
router.post('/postComment', postsController.createComment)

router.put('/like', editController.addLike)
router.put('/unlike', editController.unlike)
module.exports = router;