const express = require('express');
const router = express.Router();
const Alumni = require('../../models/alumni');
const { error } = require('jquery');

router.get('/members', async (req, res) => {
  try {
    const alumniData = await Alumni.find();
    if (!alumniData) {
      return res.status(400).json({ msg: 'No alumni data available' });
    }
    return res.json(alumniData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
