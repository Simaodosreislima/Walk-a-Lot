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
        'https://res.cloudinary.com/dvzekm9zq/image/upload/v1660147132/cards/walking-default_uv09ne.webp',
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    walkPhotoUrl: [String],
  },
  {
    timestamps: true,
  }
);

const Card = model('Card', cardSchema);
module.exports = Card;
