const router = require('express').Router();

const apiRoutes = require('./api');
const pageRoutes = require('./pageroutes');
const dashboardroutes = require("./dash-routes")

router.use('/', pageRoutes);
router.use('/dashboard', dashboardroutes)
router.use('/api', apiRoutes);

module.exports = router;