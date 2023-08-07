const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema(
  {
    alumni: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'alumni',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  { collection: 'article' }
);

module.exports = Article = mongoose.model('article', ArticleSchema);
