const Comments = require('../models/Comments.js');

const commentdata = {
    comment_content: "this guy knows what he's talking about",
    user_id: 1,
    post_id: 1
}

const seedcomments = () => Comments.create(commentdata);

module.exports = seedcomments;