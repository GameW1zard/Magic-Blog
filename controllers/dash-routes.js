const router = require('express').Router()
const {Posts, Users, Comments} = require('../models')
const withAuth = require('../Utils/auth.js')

router.get('/', withAuth, async (req, res) => {
    try {
      const postData = await Posts.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
  
      const posts = postData.map((post) => post.get({ plain: true }));
  
      res.render('user-posts', {
        layout: 'dashboard',
        posts,
      });
    } catch (err) {
      res.redirect('login');
    }
  });

  router.get('/new', withAuth, (req, res) => {
    res.render('new', {
      layout: 'dashboard',
    });
  });

  router.get('/edit/:id', withAuth, async (req, res) => {
    try {
      const postData = await Posts.findByPk(req.params.id);
  
      if (postData) {
        const post = postData.get({ plain: true });
  
        res.render('edit', {
          layout: 'dashboard',
          post,
        });
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.redirect('login');
    }
  });
module.exports = router;