// loads environment variables
require('dotenv/config');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config');


const register = require('./routes/register');
const movies = require('./routes/movies');
const login = require('./routes/login');
const watchlist = require('./routes/watchList');

const app = express();
const port = process.env.PORT || 3030;

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.set('secret', config.secret);

app.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  res.send('Welcome to my fabulous TE ! Please go to /register or /login !');
});

app.use('/login', login);

app.use('/register', register);

// JWT verification
app.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      // On accroche le UserId a la requête (Bonus)
      req.userId = decoded.userId;
      return next();
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
});

// Protected Routes
app.use('/movies', movies);
app.use('/watchlist', watchlist);


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
