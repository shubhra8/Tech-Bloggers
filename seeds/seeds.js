const sequelize = require('../config/connection');
const Dashboard  = require('../models/Dashboard');
const User = require('../models/User');
const userData = require('./userData.json');
const dashData = require('./dashboardData.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
 

  for (const data of dashData) {
    await Dashboard.create({
      ...data,
      id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
