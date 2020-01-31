const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dbAuth = require('./auth-model.js');
const { jwtSecret } = require('../config/secrets')

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  dbAuth.register(user)
      .then(saved => {
          //res.status(201).json(saved)

          const token = generateToken(user);
          res.status(200).json({payload: token})
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  
  dbAuth.login({ username }).first()
  .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({payload: token})
      } else {
          res.status(401).json({ message: 'Invalid credentials'})
      }
  })
  .catch(err => {
      console.log(err)
      resizeTo.status(500).json(err)
  })
})

function generateToken(user) {
  const payload = {
      user
  }

  const options = {
      expiresIn: '1h'
  }
  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
