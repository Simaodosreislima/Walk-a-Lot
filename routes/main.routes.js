const isLoggedIn = require('../middleware/isLoggedIn');

const router = require('express').Router();

/* GET main page */

router.get('/main', isLoggedIn, (req, res, next) => {
  res.render('main/main-page', { user: req.session.user });
});

module.exports = router;
