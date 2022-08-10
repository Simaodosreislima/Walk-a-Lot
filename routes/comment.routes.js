const router = require('express').Router();

const User = require('../models/User.model');
const Card = require('../models/Card.model');
const Comment = require('../models/Comment.model');

router.post('/cards/:id/comment', async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;
  const user = req.session.user;

  try {
    const createdComment = await Comment.create({ author: user._id, content })

    await Card.findByIdAndUpdate(id, {
      $push: {
        comments: createdComment._id
      }
    })
    res.redirect(`/main/${id}/details`)
  } catch (error) {
    next(error)
  }

  //getting the user first
  /*  Comment.create({ author: user._id, content: content })
     .then((createdComment) => {
       Card.findByIdAndUpdate(id, {
         $push: {
           comments: createdComment._id
         }
       })
     })
     .then(() => )
     .catch((err) => next(err)) */
  /*   User.findOne({ username: authorName })
      .then((user) => {
        return Comment.create({ author: user._id, content });
      })
      .then((newComment) => {
        return Card.findByIdAndUpdate(id, {
          $push: { comments: newComment._id },
        });
      })
      .then((id) => res.redirect('/cards/card-details', id))
      .catch((err) => next(err)); */
});

module.exports = router;
