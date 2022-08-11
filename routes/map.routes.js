const router = require('express').Router();
const Place = require('../models/Place.model');

router.get('/map', (req, res, next) => {
  Place.find().then((places) => res.render('map', { places }));
});

router.post('/map/create', (req, res, next) => {
  const { name, description, latitude, longitude } = req.body;

  Place.create({
    name,
    description,
    location: {
      type: 'Point',
      coordinates: [longitude, latitude],
    },
  })
    .then(() => res.redirect('/map'))
    .catch((err) => next(err));
});

module.exports = router;
