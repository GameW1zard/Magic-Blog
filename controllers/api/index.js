const router = require('express').Router();
const userRoutes = require('./usertable');
const postRoutes = require('./posttable');
const commentRoutes = require('./commentstable');
const loginRoutes = require('./loginroutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/login', loginRoutes);

module.exports = router;