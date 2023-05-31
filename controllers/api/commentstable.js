const router = require('express').Router();
const Comments = require('../../models/Comments');

router.get ('/:post_id', async function (req, res) {
    postdata = await Comments.findAll({where: {post_id: req.params.post_id}});
    res.status(200).json(postdata);
});

router.delete ('/:id', async function (req, res) {
    postdata = await Comments.destroy({where: {id: req.params.id}});
    res.status(200).json(postdata);
});

router.post ('/', async function (req, res) {
    postdata = await Comments.create({...req.body, user_id: req.session.user_id});
    res.status(200).json(postdata);
});

module.exports = router;
