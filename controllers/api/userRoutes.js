const router = require('express').Router();
const bcrypt = require('bcrypt');
const  User = require('../../models/User.js');
const  Dashboard = require('../../models/Dashboard.js');


//route to existing user login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.emaillogin } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
   const newUser = req.body;
    newUser.password = await bcrypt.hash(req.body.passwordlogin, 10);
    const validPassword = await bcrypt.compare(
      req.body.passwordlogin,
      newUser.password
    );
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// route to create/add a login
router.post('/', async (req, res) => {
  try {
    const Data =  await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    
    });
    req.session.save(() => {
      req.session.user_id = Data.id;
      req.session.logged_in = true;
    res.status(200).json(Data);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/signup/:email', async(req, res) =>  {
  try {
    const projectData = await User.findOne({
      where: {
        email: req.params.email,
      },
    });
    const user = projectData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;