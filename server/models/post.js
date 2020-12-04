const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    comment: {
        type: String,
        maxlength: 200
    },
    name: {
        type: String,
        trim: true,
        minlength: 20
    },
    img: {
        type: String,
        minlength: 100
    },
    like: {
        type: String,
        maxlength: 10
    }

  })
  
const Post = mongoose.model('Post', postSchema)

module.exports = { Post }
