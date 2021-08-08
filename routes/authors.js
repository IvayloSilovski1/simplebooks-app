const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Author = require('../models/Author');

// @route       GET authors
// @dec         get all authors
// @access      Public
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.email != null && req.query.email !== '') {
    searchOptions.email = new RegExp(req.query.email, 'i');
  }

  try {
    let authors = await Author.find(searchOptions);
    res.render('authors/index', { authors, searchOptions: req.query });
  } catch (error) {
    console.log(error);
    res.status(500).render('/', {
      author,
      errorMessage:
        'There was a problem creating new author. Please try again.',
    });
  }
});

// @route       GET authors/new
// @dec         Create new author form
// @access      Public
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// @route       POST authors
// @dec         create new author
// @access      Public
router.post(
  '/',
  [
    check('name', 'Name is required!').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;

    const author = new Author({
      name,
      email,
    });

    try {
      await author.save();

      res.redirect('/authors', 200);
    } catch (error) {
      console.log(error);
      res.status(500).render('authors/new', {
        author,
        errorMessage:
          'There was a problem creating new author. Please try again.',
      });
    }
  }
);

module.exports = router;
