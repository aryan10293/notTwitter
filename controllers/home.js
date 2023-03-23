const User = require("../models/user");
const Post = require("../models/post");
module.exports = {
    getIndex: (req,res) => {
        res.render("home.ejs")
    },

    getTweet: (req,res) => {
        res.render("tweet.ejs")
    },
    getProfile: async (req,res) => {
        //sort from newest to oldedt
        console.log(req.user.id)
        const userPost = await Post.find({userId: req.user.id})
        console.log(userPost)
        res.render("profile.ejs", {post: userPost })
    },
    getFeed: async (req,res) => {
        //sort from newest to oldedt
        const user = await User.find()
        const followersAndYourPosts = await Post.find()
        res.render("feed.ejs", {post: followersAndYourPosts }, {users: user})
    },
}