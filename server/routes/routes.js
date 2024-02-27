let express = require('express'),
    router = express.Router(),
    apiRouter = require('./api/api')


router.use('/api', apiRouter)

router.route('*').get((req, res, next) => {
    res.status(200).json({ message: "Response from server"})
})


module.exports = router;
