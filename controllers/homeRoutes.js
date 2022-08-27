const router = require('express').Router();
const { Comment,Dashboard, User } = require('../models');
//const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
   try {
  const projectData = await Dashboard.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });
 
        
//return res.render('dish', dishes[req.params.num - 1]);
    // Serialize data so the template can read it
     const dashboards  = projectData.map((Dashboard) => Dashboard.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { dashboards, loggedIn: req.session.loggedIn,
  });
}
   catch (err) {
    res.status(500).json(err);
  }
});

router.get('/home', async (req, res) => {
   try {
  const projectData = await Dashboard.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });
 
        
//return res.render('dish', dishes[req.params.num - 1]);
    // Serialize data so the template can read it
     const dashboards  = projectData.map((Dashboard) => Dashboard.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { dashboards, loggedIn: req.session.loggedIn,
  });
}
   catch (err) {
    res.status(500).json(err);
  }
});




router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  res.render('login',{
      loggedIn: req.session.loggedIn,
    });
});


router.get('/dashboard/:id',async(req,res) =>{ 
  try {
    const dbUserData = await Dashboard.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const dashboard = dbUserData.get({ plain: true });
    res.render('singlepost', { dashboard,loggedIn: req.session.loggedIn,
      })

  }
catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/dashboard/post/:id',async(req,res) =>{ 
  try {
    const dbUserData = await Dashboard.findByPk(req.params.id,{
      include: [
        {
          model: User,
          attributes: ['id','name'],
        },
      {
        model:Comment,
        attributes: ['user_id','comment_text'],
        include: [
            {
              model: User,
              attributes: {exclude: ['password']},
            },
      ],
    }
      ]
    });

      //const dashboard = dbUserData.map((dashboard) =>dashboard.get({ plain: true }));
    const dashboard = dbUserData.get({ plain: true });
     res.render('commentpost', { 
      ...dashboard,
  logged_in: req.session.logged_in,
  });
  }
catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



  module.exports = router;
