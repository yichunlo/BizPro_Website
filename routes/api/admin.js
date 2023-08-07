const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const router = express.Router();
const Alumni = require('../../models/alumni');
const Article = require('../../models/article');
const Admin = require('../../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// POST: Add alumni
router.post(
  '/add_alumni',
  auth,
  check('name', 'Name is required').notEmpty(),
  check('number', 'Number is required').notEmpty(),
  check('jobTitle', 'Job title is required').notEmpty(),
  check('exp', 'Experience is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, number, jobTitle, exp, tags, avatar, major } = req.body;

    try {
      let alumni = await Alumni.findOne({
        name,
        number,
      });
      if (alumni) {
        return res.status(400).json({ msg: 'alumni already exists' });
      }
      // Todo: avatar normalization

      alumni = new Alumni({
        name,
        number,
        jobTitle,
        exp,
        tags,
        avatar,
        major,
      });

      await alumni.save();
      res.send('alumni added success!!');

      const payload = {
        alumni: {
          id: alumni.id,
        },
      };
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

// POST: Add article
router.post(
  '/add_article',
  auth,
  check('name', 'Alumni name is required').notEmpty(),
  check('number', 'Alumni number is required').notEmpty(),
  check('title', 'Title is required').notEmpty(),
  check('content', 'Content is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Search alumni ID
      let alumni = await Alumni.findOne({
        name: req.body.name,
        number: req.body.number,
      });

      if (!alumni) {
        return res.status(400).json({ msg: 'Cannot find alumni' });
      }

      // else if (await Article.findOne({ alumni: alumni._id })) {
      //   // check if 'One existed article belongs to this alumni'
      //   return res
      //     .status(400)
      //     .json({ msg: 'One existed article belongs to this alumni' });
      // }

      await Article.create({
        alumni: alumni.id,
        title: req.body.title,
        content: req.body.content,
        avatar: req.body.avatar,
      });
      // if article is already exist: update it
      res.send('Article added success!!');
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// PUT: Update article
router.put(
  '/update_article',
  auth,
  check('_id', 'Article ID is required').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //  check if article exist
      let article = await Article.findById(req.body._id);
      if (!article) {
        console.log('No article');
        return res.status(400).json({ msg: 'No article data' });
      }
      let alumni = await Alumni.findOne({
        name: req.body.name,
        number: req.body.number,
      });
      if (!alumni) {
        // check if alumni exist (in case alumni name or number has been changed)
        return res.status(400).json({ msg: 'Cannot find alumni' });
      }
      let articleByAlumni = await Article.findOne({ alumni: alumni._id });
      if (articleByAlumni._id === req.body._id) {
        // check if 'One existed article belongs to this alumni'
        return res
          .status(400)
          .json({ msg: 'One existed article belongs to this alumni' });
      }

      article.alumni = alumni._id;
      if (req.body.title != '' && req.body.title != null)
        article.title = req.body.title;
      if (req.body.content != '' && req.body.content != null)
        article.content = req.body.content;
      if (req.body.avatar != '' && req.body.avatar != null)
        article.avatar = req.body.avatar;

      // if article is already exist: update it
      let result = await article.save();
      res.json(article);
    } catch (e) {
      console.error(e.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// PUT: Update alumni
router.put(
  '/update_alumni',
  auth,
  check('_id', 'Alumni ID is required').notEmpty(),
  async (req, res) => {
    const error = validationResult(req.body);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      const id = req.body._id;
      let alumni = await Alumni.findOne({
        name: req.body.name,
        number: req.body.number,
      });
      if (alumni && alumni._id.valueOf() !== id) {
        return res.status(400).json({ msg: 'alumni already exists' });
      }

      alumni = await Alumni.findById(id);
      if (!alumni) {
        console.log('No alumni');
        return res.status(400).json({ msg: 'No alumni data' });
      }

      if (req.body.name != '' && req.body.name != null)
        alumni.name = req.body.name;
      if (req.body.number != '' && req.body.number != null)
        alumni.number = req.body.number;
      if (req.body.jobTitle != '' && req.body.jobTitle != null)
        alumni.jobTitle = req.body.jobTitle;
      if (req.body.exp != '' && req.body.exp != null) alumni.exp = req.body.exp;
      if (req.body.avatar != '' && req.body.avatar != null)
        alumni.avatar = req.body.avatar;
      if (req.body.tags != null) alumni.tags = req.body.tags;
      if (req.body.major != '' && req.body.major != null)
        alumni.major = req.body.major;
      let result = await alumni.save();
      res.json(alumni);
    } catch (e) {
      console.error(e.message);
      return res.status(400).json({ msg: 'Server Error' });
    }
  }
);

// DELETE: Delete alumni
router.delete(
  '/delete_alumni',
  auth,
  check('_id', 'Alumni ID is required').notEmpty(),
  async (req, res) => {
    error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let result = await Alumni.findOneAndRemove({ _id: req.body._id });
      if (!result) {
        console.log('no alumni found');
        return res.status(400).json({ msg: 'Cannot find alumni data' });
      }
      res.send('alumni deleted');
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

// DELETE: Delete article
router.delete(
  '/delete_article',
  auth,
  check('_id', 'ID is required').notEmpty(),
  async (req, res) => {
    error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    try {
      let result = await Article.findOneAndRemove({ _id: req.body._id });
      if (!result) {
        console.log('no article found');
        return res.status(400).json({ msg: 'Cannot find article data' });
      }
      res.send('article deleted');
    } catch (e) {
      console.error(e.message);
      res.status(500).send('Server Error');
    }
  }
);

// add admin (be careful / temp)
router.post(
  '/add_admin',
  check('name', 'Name is required').notEmpty(),
  check(
    'password',
    'please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    try {
      let admin = await Admin.findOne({ name });
      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Admin already exists' }] });
      }
      admin = new Admin({
        name: name,
        password: password,
      });

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();

      const payload = {
        admin: {
          id: admin.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 86400 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (e) {
      console.error(e.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

module.exports = router;
