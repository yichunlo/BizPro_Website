const express = require('express');
const router = express.Router();

const Article = require('../../models/article');
const Alumni = require('../../models/alumni');
const articleQuery = require('../../core/articleQuery');

router.get('/member_talk', async (req, res) => {
  try {
    const article = await Article.find().populate('alumni', [
      'name',
      'number',
      'jobTitle',
      'tags',
      'major',
    ]);
    if (!article) {
      return res.status(400).json({ msg: 'Article data is not available' });
    }
    res.json(article);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/select', async (req, res) => {
  try {
    let query = articleQuery(req);
    IDList = [];
    const alumniData = Alumni.find(query).cursor();
    for (
      let doc = await alumniData.next();
      doc != null;
      doc = await alumniData.next()
    ) {
      IDList.push(doc._id.valueOf());
    }

    let newQuery = {
      alumni: { $in: IDList },
    };

    const articleData = await Article.find(newQuery).populate('alumni', [
      'name',
      'number',
      'jobTitle',
      'tags',
    ]);
    if (!articleData) {
      return res.status(400).json({ msg: 'article data not found' });
    }
    res.status(200).json(articleData);
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
