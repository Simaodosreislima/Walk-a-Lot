const isLoggedIn = require('../middleware/isLoggedIn');
const Card = require("../models/Card.model");
const fileUploader = require("../config/cloudinary.config");
const { route } = require('./auth.routes');

const router = require('express').Router();

/* GET main page */
router.get("/cards/create", (req, res, next) => {
  res.render("main/cards/card-create")
});

router.post("/cards/create", fileUploader.single("cardImageUrl"), (req, res, next) => {
  const { title, description } = req.body;
  if (!req.file) {
    Card.create({ title, description })
      .then((card) => {
        //Add card _id to cardsArray from user
        res.redirect("/main")
      })
      .catch((err) => next(err));
  } else {
    const cardImageUrl = req.file.path;
    Card.create({ title, description, cardImageUrl })
      .then((card) => {
        //Add card _id to cardsArray from user
        res.redirect("/main")
      })
      .catch((err) => next(err));
  }
})

router.get('/main', isLoggedIn, (req, res, next) => {
  Card.find()
    .then((cards) => {
      res.render("main/main-page", { cards, user: req.session.user })
    })
    .catch((err) => next(err));
});

module.exports = router;
