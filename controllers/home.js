const User = require("../models/user");
const Post = require("../models/post");
module.exports = {
    getIndex: (req,res) => {
        res.render("home.ejs")
    },

    getTweet: (req,res) => {
        res.render("tweet.ejs")
    },
    getComment: (req,res) => {
        console.log(req.params.id)
        // get the id to use for nect page to render and add to database to you can know what tweet to post it to. lets get this money this week
        res.render("comment.ejs")
    },
    getProfile: async (req,res) => {
        //sort from newest to oldedt
        const userPost = await Post.find({userId: req.user.id})
        res.render("profile.ejs", {post: userPost })
    },
    getFeed: async (req,res) => {
        //sort from newest to oldedt
        const followersAndYourPosts = await Post.find()
        const blah = await User.find({_id: req.user.id})
        res.render("feed.ejs", {post: followersAndYourPosts, user: blah[0].likedPost })
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