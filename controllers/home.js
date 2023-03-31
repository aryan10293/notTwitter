const User = require("../models/user");
const Post = require("../models/post");
const Comments = require("../models/comment");
module.exports = {
    getIndex: (req,res) => {
        res.render("home.ejs")
    },

    getTweet: (req,res) => {
        res.render("tweet.ejs")
    },
    getTweetPost: async (req,res) => {
        const tweet = await Post.find({_id: req.params.id})
        const comment = await Comments.find({tweetId: req.params.id})
        const blah = await User.find({_id: req.user.id})
        console.log(tweet)
        console.log(comment)
        res.render("tweetContent.ejs", {post: tweet, comments: comment.reverse(), user: blah[0].likedPost })
    },
    getComment: async (req,res) => {
        //console.log(req.params.id)
        const userPost = await Post.find({_id: req.params.id})
        console.log(req.user.userName)
        console.log(userPost)
        // get the id to use for nect page to render and add to database to you can know what tweet to post it to.
        res.render("comment.ejs", {tweet: userPost})
    },
    getProfile: async (req,res) => {
        //sort from newest to oldedt
        const allPeople = await User.find()
         const me = await User.find({_id: req.user.id})
        const userPost = await Post.find({userId: req.user.id})
        const followersAndYourPosts = await Post.find()
        const popularPost = followersAndYourPosts.sort((a,b) => b.likes.length - a.likes.length)
        
        res.render("profile.ejs", {post: userPost, user: me[0].likedPost, allUsers: allPeople.reverse(), popular: popularPost, me: me[0]  })
    },
    getLikedFromProfile: async (req,res) => {
        //sort from newest to oldedt
        const allPeople = await User.find()
         const me = await User.find({_id: req.user.id})
        const userPost = await Post.find({userId: req.user.id})
        const followersAndYourPosts = await Post.find()
        const popularPost = followersAndYourPosts.sort((a,b) => b.likes.length - a.likes.length)
        console.log(`${me[0]._id}` === `${allPeople[0]._id}`)
        console.log(`${allPeople[0]._id}`)
        res.render("likedpostprofile.ejs", {post: followersAndYourPosts , user: me[0].likedPost, allUsers: allPeople.reverse(), popular: popularPost, me: me[0]  })
    },
    getFeed: async (req,res) => {
        //sort from newest to oldedt
        const allPeople = await User.find()
       // console.log(allPeople)
        const me = await User.find({_id: req.user.id})
        const followersAndYourPosts = await Post.find()
        const popularPost = followersAndYourPosts.sort((a,b) => b.likes.length - a.likes.length)
        res.render("feed.ejs", {post: followersAndYourPosts, user: me[0].likedPost, allUsers: allPeople.reverse(), popular: popularPost, me: me[0] })
    },
    getUser: async (req,res) => {
        const userPost = await Post.find({name: req.params.user})
        res.render("userProfile.ejs", {post: userPost })
    },
    getFollowers: async (req,res) => {
        const allPeople = await User.find()
        const me = await User.find({_id: req.user.id})
       const userPost = await Post.find({userId: req.user.id})
       const followersAndYourPosts = await Post.find()
       const popularPost = followersAndYourPosts.sort((a,b) => b.likes.length - a.likes.length)
       let obj = []
       let arr = me[0].followers
        for(let i = 1; i<=arr.length; i++){
            const lol = await User.find({_id: arr[i]})
            if(lol.length > 0){
                obj.push(lol)
            }
        }
       res.render("followers.ejs", {post: followersAndYourPosts , user: me[0].likedPost, allUsers: allPeople.reverse(), popular: popularPost, me: me[0], followers: obj  })
    },
    getFollowings: async (req,res) => {
        const allPeople = await User.find()
        const me = await User.find({_id: req.user.id})
       const userPost = await Post.find({userId: req.user.id})
       const followersAndYourPosts = await Post.find()
       const popularPost = followersAndYourPosts.sort((a,b) => b.likes.length - a.likes.length)
       let obj = []
       let arr = me[0].following
        for(let i = 1; i<=arr.length; i++){
            const lol = await User.find({_id: arr[i]})
            if(lol.length > 0){
                obj.push(lol)
            }
        }
       res.render("following.ejs", {post: followersAndYourPosts , user: me[0].likedPost, allUsers: allPeople.reverse(), popular: popularPost, me: me[0], following: obj,  })
    }  
}
// <% if( user.includes(el._id) ){ %>
//     <button class="unlike">unlike <%= el.likes.length-1 %></button>
// <% } else{ %>
//     <button  class="like" >like <%= el.likes.length-1 %></button>
// <% } %> %>
// user.name  -->

//!me.following.includes(allUsers[i]._id)   