// loads environment variables
require('dotenv/config');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const users = require('./routes/users');
const config = require('./config');

const app = express();
const port = process.env.PORT || 3030;

app.use(cors({ origin: '*' }));

app.set('secret', config.secret);
app.use(express.json());

app.post('/signin', (req, res, next) => { // eslint-disable-line no-unused-vars
  const { email } = req.body;
  const payload = { email };
  const token = jwt.sign(payload, app.get('secret'), {
    expiresIn: 60 * 60 * 24, // expires in 24 hours
  });
  // return the information including token as JSON
  res.json({
    success: true,
    token,
  });
});

// JWT verification
// app.use((req, res, next) => {
//   const token = req.body.token || req.query.token || req.headers['x-access-token'];

//   if (token) {
//     jwt.verify(token, app.get('secret'), (err, decoded) => {
//       if (err) {
//         return res.json({ success: false, message: 'Failed to authenticate token.' });
//       }
//       req.decoded = decoded;
//       return next();
//     });
//   } else {
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.',
//     });
//   }
// });

// Register routes
app.use('/users', users);

// Server the index.html file for all other routes
app.get('*', (req, res) => {
  res.send('Welcome to this marvelous backend !');
});

// Forward 404 to error handler
app.use((req, res, next) => { // eslint-disable-line no-unused-vars
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(`${err.status} ${err.message}`);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
