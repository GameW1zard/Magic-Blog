const Posts = require('../models/Posts.js');

const postdata =
    {
        title: 'My opinion on Handlebars',
        post_content: 'Handlebars sucks',
        user_id: 1
    };

const seedposts = () => Posts.create(postdata);

module.exports = seedposts; 
    