//const User = require("../models/User");
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
}