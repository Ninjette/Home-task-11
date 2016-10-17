const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    movieTitle: String,
    text: String,
    rating: String,
    userId: String
}, {timestamps: true});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
