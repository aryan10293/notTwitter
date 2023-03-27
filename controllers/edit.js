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

}