const router = require('express').Router();

const thoughtRoutes = require('./Thought_routes');
const userRoutes = require('./User_routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;