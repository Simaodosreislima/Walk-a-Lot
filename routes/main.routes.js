const isLoggedIn = require('../middleware/isLoggedIn');
const Card = require('../models/Card.model');
const fileUploader = require('../config/cloudinary.config');
const { route } = require('./auth.routes');
const User = require('../models/User.model');

const router = require('express').Router();

/* GET main page */
router.get('/cards/create', (req, res, next) => {
  res.render('main/cards/card-create');
});

router.post(
  '/cards/create',
  fileUploader.single('cardImageUrl'),
  (req, res, next) => {
    const { title, description } = req.body;
    const userId = req.session.user._id;
    if (!req.file) {
      Card.create({ title, description })
        .then((newCard) => {
          //Add card _id to cardsArray from user
          return User.findByIdAndUpdate(userId, {
            $push: { walkCards: newCard._id },
          }).then(() => res.redirect('/main'));
        })
        .catch((err) => next(err));
    } else {
      const cardImageUrl = req.file.path;
      Card.create({ title, description, cardImageUrl })
        .then((newCard) => {
          //Add card _id to cardsArray from user
          return User.findByIdAndUpdate(userId, {
            $push: { walkCards: newCard._id },
          }).then(() => res.redirect('/main'));
        })
        .catch((err) => next(err));
    }
  }
);

router.get('/main', isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate('walkCards')
    .then((user) => {
      res.render('main/main-page', user);
    })
    .catch((err) => next(err));
});

module.exports = router;
