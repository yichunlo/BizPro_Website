const mongoose = require('mongoose');

const AlumniSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    exp: {
      type: [String],
      required: true,
    },
    tags: {
      type: [String],
    },
    avatar: {
      type: String,
    },
    major: {
      type: [String],
    },
  },
  { collection: 'alumni' }
);

module.exports = Alumni = mongoose.model('alumni', AlumniSchema);
