const router = require('express').Router();
const { Dashboard, User, Comment } = require('../../models');
const path = require('path');


router.put('/:id',async (req,res) =>{
 
  try{
    const dash = await Dashboard.update(
      {
      name:req.body.title,
      description:req.body.content,
    },
    {
    where: 
    {
      id:req.params.id,
    },
  }
    );
    res.status(200).json(dash);
  }  catch (err) {
    res.status(500).json(err);
  }
});



// route to create/add a dashboard
router.post('/', async (req, res) => {
  try {
    const Data =  await Dashboard.create({
      name: req.body.tname,
      description: req.body.tdesc,
      user_id:req.session.user_id,
      
    });
    res.status(200).json(Data);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Dashboard }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,loggedIn: req.session.loggedIn,logged_in: true,
      });
      
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/newpost',(req,res)=> {
res.render('newpost',{
  loggedIn: req.session.loggedIn,logged_in: true,
})
});
//To Delete a Dashboard
router.delete('/:id', async (req, res) => {
  try {
    const projectData = await Dashboard.destroy({
      where: {
        id: req.params.id,
       
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No Dashboard found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/post/:id', async (req, res) => {
  try {
    const Data =  await Comment.create({
      comment_text: req.body.comment,
     dashboard_id: req.body.id,
     user_id:req.session.user_id,
    });
  
    res.status(200).json(Data);
    
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;