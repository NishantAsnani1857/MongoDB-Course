const Router = require('express').Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = Router();
const user = require('../model/userSchema')
const createToken = () => {
  return jwt.sign({}, 'secret', { expiresIn: '1h' });
};

router.post('/login', async (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Check if user login is valid
  const currUser = await user.findOne({ email: email })


  if (!currUser) {
    console.log(currUser);
    console.log(`Invalid username or password `);
    res.status(401).json({ message: 'Authentication failed, invalid username or password.' });
  }
  else if (currUser) {
    
    await bcrypt.compare(pw, currUser.password)
      .then((result) => {
        if(!result) throw Error;
        const token = createToken();
        res.status(200).json({ token: token, message: "Authentication Succeeded" });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Authentication failed' });
      });
  }

  // If yes, create token and return it to client
});

router.post('/signup', async (req, res, next) => {
  const email = req.body.email;
  const pw = req.body.password;
  // Hash password before storing it in database => Encryption at Rest

  const Duplicate = await user.findOne({ email: email })

  if (Duplicate) {
    console.log(`User already exists`);
    res.status(500).json({ message: 'User already exists.' });
  }
  else {
    bcrypt.hash(pw, 12)
      .then(async hashedPW => {
        // Store hashedPW in database
        // Add user to database
        const User = new user({ email: email, password: hashedPW })
        await User.save()
          .then((result) => {
            console.log(`User added in database `);
          })
          .catch((err) => {
            console.log(`Oh no error adding into database ${err}`);
          })
        const token = createToken();
        res.status(201).json({ token: token, user: { email } });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Creating the user failed.' });
      });
  }




});

module.exports = router;
