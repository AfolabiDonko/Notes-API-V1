const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedAt: {
    type: Date,
    default: null,
  },
});
// Middleware pre-save pour mettre à jour lastUpdatedAt
noteSchema.pre('save', function (next) {
  this.lastUpdatedAt = new Date();
  next();
});
const Note = (mongoose) => mongoose.model('Note', noteSchema);
module.exports = Note;
