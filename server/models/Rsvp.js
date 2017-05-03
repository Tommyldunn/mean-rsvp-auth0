/*
 |--------------------------------------
 | Rsvp Model
 |--------------------------------------
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rsvpSchema = new Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  eventId: { type: String, required: true },
  eventTitle: { type: String, required: true },
  attending: { type: Boolean, required: true },
  guests: Number,
  comments: String
});

module.exports = mongoose.model('Rsvp', rsvpSchema);
