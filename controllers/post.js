const Tweet = require('../models/post')
const Comment = require('../models/comment')

module.exports = {
    createTweet: async (req,res) => {
        try{
            await Tweet.create({
                text: req.body.tweet,
                date: Date.now(),
                likes: 0,
                retweets: 0,
                userId: req.user.id,
                name: req.user.userName,
                deleted: false
            })
            console.log('lol')
            res.redirect("/profile");
        } catch(err){
            console.error(err)
        }
    },
    createComment: async (req,res) => {
        console.log(req.params)
        try{
            await Comment.create({
                text: req.body.comment,
                date: Date.now(),
                likes: 0,
                retweets: 0,
                userId: req.user.id,
                name: req.user.userName,
                deleted: false,
                tweetId: req.body.tweetid
            })
            console.log('comment has been posted')
            res.redirect(`/${req.user.userName}/tweet/${req.body.tweetid}`);
        } catch(err){
            console.error(err)
        }
    }

}