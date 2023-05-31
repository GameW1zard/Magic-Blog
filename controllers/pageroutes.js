const router = require('express').Router();
const { Posts, Users, Comments } = require('../models');

router.get('/', async (req, res) => {
    try{
        const postData = await Posts.findAll({
            include: [Users],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        //console.log (posts);

        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err)
    }

});

router.get ('/login', async function (req, res) {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('login');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

router.get ('/register', async function (req, res) {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('register');
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;