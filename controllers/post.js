const Tweet = require('../models/post')

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
    }

}