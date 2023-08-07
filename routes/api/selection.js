const express = require('express');
const router = express.Router();
const Alumni = require('../../models/alumni');
const findQuery = require('../../core/findQuery');

router.post('/select', async (req, res) => {
  try {
    let query = findQuery(req);

    const alumniData = await Alumni.find(query);
    if (!alumniData) {
      res.status(400).json({ msg: 'No alumni data available' });
    } else {
      res.status(200).json(alumniData);
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/search', async (req, res) => {
  try {
    let query = findQuery(req);
    let searchData = req.body.search;
    const result = await Alumni.find({
      ...query,
      $or: [
        {
          number: { $regex: `${searchData}`, $options: 'i' },
        },
        {
          name: { $regex: `${searchData}`, $options: 'i' },
        },
        {
          major: { $regex: `${searchData}`, $options: 'i' },
        },
        {
          exp: { $regex: `${searchData}`, $options: 'i' },
        },
        {
          jobTitle: { $regex: `${searchData}`, $options: 'i' },
        },
        {
          tags: { $regex: `${searchData}`, $options: 'i' },
        },
      ],
    });
    if (!result) {
      res.status(400).json({ msg: 'No alumni data available' });
    }
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: 'Server Error!' });
  }
});

module.exports = router;
