const express = require('express');
const {passport, HandleAuthCallback} = require('../../../services/passport');
const authorization = require('../../../middleware/authorization');

const router = express.Router();

/**
 * This returns the user if they are logged in.
 */
router.get('/', (req, res, next) => {

  if (req.user) {
    return next();
  }

  res.status(204).end();
}, (req, res) => {

  // Send back the user object.
  res.json({user: req.user});
});

/**
 * This destroys the session of a user, if they have one.
 */
router.delete('/', authorization.needed(), (req, res) => {
  delete req.session.passport;

  res.status(204).end();
});

//==============================================================================
// PASSPORT ROUTES
//==============================================================================

/**
 * Local auth endpoint, will recieve a email and password
 */
router.post('/local', (req, res, next) => {

  // Perform the local authentication.
  passport.authenticate('local', HandleAuthCallback(req, res, next))(req, res, next);
});

module.exports = router;
