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
        const userPost = await Post.find({userId: req.user.id})
        res.render("profile.ejs", {post: userPost })
    },
    getFeed: async (req,res) => {
        //sort from newest to oldedt
        const allPeople = await User.find()
       // console.log(allPeople)
       const me = await User.find({_id: req.user.id})
       console.log(me[0].following)
        const followersAndYourPosts = await Post.find()
        const blah = await User.find({_id: req.user.id})
        const popularPost = followersAndYourPosts.sort((a,b) => b.likes.length - a.likes.length)
        res.render("feed.ejs", {post: followersAndYourPosts, user: blah[0].likedPost, allUsers: allPeople.reverse(), popular: popularPost, me: me[0].following})
    },
    getUser: async (req,res) => {
        const userPost = await Post.find({name: req.params.user})
        res.render("userProfile.ejs", {post: userPost })
    },
}
// set varibles in ejs

// <!-- <% let user =  %>

// let lol = <% user.filter( x => { %>
//     <% if(x._id === el.userId) { %>
//         <span><%=x.userName%></span>
//     <%}

//     <div class='container' data-id='<%=el._id%>'>
//         <p><%= el.text %></p>
//         <span><button><a href="/profile" class='del'> delete</a></button> </span>
//         <span class="retweet"><a href="#">Retweet</a></span><span><%= el.retweets %></span>
//         <span class="like"><a href="#">like</a></span><span><%= el.likes %></span>
//     </div>
// <% }) %>   

// user.name  -->