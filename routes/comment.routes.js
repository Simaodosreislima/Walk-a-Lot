const router = require('express').Router();

const User = require('../models/User.model');
const Card = require('../models/Card.model');
const Comment = require('../models/Comment.model');

router.post('/cards/:id/comment', (req, res, next) => {
  const { id } = req.params;
  const { content, authorName } = req.body;

  //getting the user first
  User.findOne({ username: authorName })
    .then((user) => {
      return Comment.create({ author: user._id, content });
    })
    .then((newComment) => {
      return Card.findByIdAndUpdate(id, {
        $push: { comments: newComment._id },
      });
    })
    .then((id) => res.redirect('/cards/card-details', id))
    .catch((err) => next(err));
});

module.exports = router;
