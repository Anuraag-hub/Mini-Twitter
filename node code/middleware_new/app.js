const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user')

const app = express();

mongoose.connect("mongodb+srv://anuraag:" + process.env.MONGO_ATLAS_PW + "@cluster0.r9avt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
    .then(() => {
        console.log("connected to database!");
    })
    .catch(()=>{
        console.log("connection failed");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("node code/images")));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
})

app.use('/posts', postsRoutes);
app.use('/user', userRoutes);

module.exports = app;