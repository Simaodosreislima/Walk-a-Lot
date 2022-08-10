const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');
const Card = require('../models/Card.model');
const fileUploader = require('../config/cloudinary.config');
const { route } = require('./auth.routes');
const User = require('../models/User.model');
const Comment = require('../models/Comment.model');

const router = require('express').Router();

/* GET main page */
router.get('/cards/create', isLoggedIn, (req, res, next) => {
  res.render('main/cards/card-create');
});

router.post(
  '/cards/create',
  fileUploader.single('cardImageUrl'),
  isLoggedIn,
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

router.get('/main/:id/edit', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .then((card) => res.render('main/cards/card-edit', card))
    .catch((err) => next(err));
});

router.post(
  '/main/:id/edit',
  fileUploader.single('cardImageUrl'),
  isLoggedIn,
  (req, res, next) => {
    const { id } = req.params;
    const { title, description, previousUrl } = req.body;

    let cardImageUrl;

    if (req.file) {
      cardImageUrl = req.file.path;
    } else {
      cardImageUrl = previousUrl;
    }

    Card.findByIdAndUpdate(id, { title, description, cardImageUrl })
      .then(() => res.redirect('/main'))
      .catch((err) => next(err));
  }
);

router.post(
  '/cards/:id/details',
  fileUploader.single('walkPhotoUrl'),
  isLoggedIn,
  (req, res, next) => {
    const { id } = req.params;
    const { previousUrl } = req.body;
    let walkPhotoUrl;

    if (req.file) {
      walkPhotoUrl = req.file.path;
    } else {
      walkPhotoUrl = previousUrl;
    }

    Card.findByIdAndUpdate(id, { walkPhotoUrl })
      .then((newPhoto) => {
        $push: {
          walkPhotoUrl: newPhoto._id;
        }
      })
      .then(() => res.redirect('/main/cards/card-details', id))

      .catch((err) => next(err));
  }
);

router.post('/main/:id/delete', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Card.findByIdAndDelete(id)
    .then(() => {
      //Add card _id to cardsArray from user
      return User.findByIdAndUpdate(req.session.user._id, {
        $pull: { walkCards: id },
      }).then(() => res.redirect('/main'));
    })
    .catch((err) => next(err));
});

router.get('/main', isLoggedIn, (req, res, next) => {
  User.findById(req.session.user._id)
    .populate('walkCards')
    .then((user) => {
      res.render('main/main-page', user);
    })
    .catch((err) => next(err));
});

router.get('/allUsers', isLoggedIn, (req, res, next) => {
  User.find()
    .then((users) => {
      res.render('main/all-users', { users });
    })
    .catch((err) => next(err));
});

router.get('/main/:id/details', isLoggedIn, (req, res, next) => {
  const { id } = req.params;

  Card.findById(id)
    .populate('comments')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        model: 'User',
      },
    })
    .then((card) => res.render('main/cards/card-details', card))
    .catch((err) => next(err));
});

module.exports = router;
