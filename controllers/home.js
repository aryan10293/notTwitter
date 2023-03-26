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
        // console.log(userPost)
        res.render("profile.ejs", {post: userPost })
    },
    getFeed: async (req,res) => {
        //sort from newest to oldedt
        const followersAndYourPosts = await Post.find()
        const blah = await User.find({_id: req.user.id})
        console.log(followersAndYourPosts)
        console.log(blah[0].likedPost)
        res.render("feed.ejs", {post: followersAndYourPosts, user: blah[0].likedPost })
    },
    getUser: async (req,res) => {
        //sort from newest to oldedt
        console.log('lol')
        const userPost = await Post.find({name: req.params.user})
        // const followersAndYourPosts = await Post.find()
        // const blah = await User.find()
        // console.log(blah)
        res.render("userProfile.ejs", {post: userPost })
        // res.render("feed.ejs", {post: followersAndYourPosts, user: blah })
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