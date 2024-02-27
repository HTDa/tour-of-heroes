let express = require('express'),
    router = express.Router(),
    heroesRoutes = require('./heroes/heroes')


router.use('/heroes', heroesRoutes)

router.route('*').get((req, res, next) => {
    res.status(200).json({ message: "Response from /api"})
})


module.exports = router;
