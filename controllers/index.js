const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');



router.use('/', homeRoutes);
router.use('/api', apiRoutes);

console.log("made it to controllers index");

module.exports = router;