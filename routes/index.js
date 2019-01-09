const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.send('Welcome to this nice TWEB TE2 backend !');
});

module.exports = router;
