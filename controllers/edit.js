const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
    addLike: async (req,res) => {
        //console.log(req.body.tweet)
        // const lol = Post.findOne({_id: req.body.tweet})
        // console.log(lol)
        try{
            await User.findOneAndUpdate(
                {_id: req.user.id},
                {
                    $push: { likedPost: req.body.tweet },
                }
            )
            await Post.findOneAndUpdate(
                {_id: req.body.tweet},
                {
                    $push: { likes: req.user.id },
                }
            )
            res.redirect(304, '/feed')
            // how to refresh page aftwe a update in mongoose
        } catch(err){
            console.error(err)
        }
    },
    unlike: async (req,res) => {
        try{
            await User.findOneAndUpdate(
                {_id: req.user.id},
                {
                    $pull: { likedPost: req.body.tweet },
                }
            )
            await Post.findOneAndUpdate(
                {_id: req.body.tweet},
                {
                    $pull: { likes: req.user.id },
                }
            )
            res.redirect(304, '/feed')
            // how to refresh page aftwe a update in mongoose
        } catch(err){
            console.error(err)
        }
    },
    follow: async (req,res) => {
        try{
            await User.findOneAndUpdate(
                {_id: req.body.tweet},
                {
                    $push: { followers: req.user.id },
                }
            )
            await User.findOneAndUpdate(
                {_id: req.user.id},
                {
                    $push: { following: req.body.tweet },
                }
            )
            console.log('follow sucess')
            res.redirect(304, '/feed')
            // how to refresh page aftwe a update in mongoose
        } catch(err){
            console.error(err)
        }
    },
    unfollow: async (req,res) => {
        try{
            await User.findOneAndUpdate(
                {_id: req.body.tweet},
                {
                    $pull: { followers: req.user.id },
                }
            )
            await User.findOneAndUpdate(
                {_id: req.user.id},
                {
                    $pull: { following: req.body.tweet },
                }
            )
            console.log('unfollow sucess')
            res.redirect(304, '/feed')
            // how to refresh page aftwe a update in mongoose
        } catch(err){
            console.error(err)
        }
    },
    delete: async (req,res) => {
        try{
            await Post.remove({_id: req.params.id})
            console.log('deleted post sucess')
            res.redirect('/feed')
            // how to refresh page aftwe a update in mongoose
        } catch(err){
            console.error(err)
        }
    }
}