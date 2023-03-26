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
                    $inc: { likes: 1 },
                }
            )
            res.redirect(200, '/feed')
            // how to refresh page aftwe a update in mongoose
        } catch(err){
            console.error(err)
        }
    },
    unlike: async (req,res) => {
        try{
            
        } catch(err){
            console.error(err)
        }
    },

}