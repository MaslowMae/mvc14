
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./api/homeRoutes.js');
const dashboardRoutes = require('./dashboardRoutes.js');

console.log('made it to controllers');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;