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
router.get('/likedPost', ensureAuth, homeController.getLikedFromProfile)
router.get('/profile/:user',ensureAuth, homeController.getUser)
router.get('/feed', ensureAuth, homeController.getFeed)
//router.get('/comment/:id',ensureAuth, homeController.comment)
router.get('/:user/:id', ensureAuth, homeController.getComment)
router.get('/:name/tweet/:id', ensureAuth, homeController.getTweetPost)
router.get("/logout", authController.logout)

router.get("/followers", homeController.getFollowers)
router.get("/following", homeController.getFollowings)

router.post('/createaccount', authController.postCreateAccount)
router.post('/login', authController.postLogin)
router.post('/postTweet', postsController.createTweet)
router.post('/postComment', postsController.createComment)

router.put('/like', editController.addLike)
router.put('/unlike', editController.unlike)
router.put('/follow', editController.follow)
router.put('/unfollow', editController.unfollow)

router.delete('/feed/delete/:id', editController.delete)
module.exports = router;