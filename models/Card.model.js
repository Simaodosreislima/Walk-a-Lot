const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    cardImageUrl: {
      type: String,
      default:
        'https://i.pinimg.com/originals/62/4b/bb/624bbbf5b3c8a293950c8ed24a0c4eef.jpg',
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  {
    timestamps: true,
  }
);

const Card = model('Card', cardSchema);
module.exports = Card;
