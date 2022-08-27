const User = require('./User');
const Dashboard = require('./Dashboard');
const Comment = require('./Comment');

User.hasMany(Dashboard, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Dashboard.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Dashboard.hasMany(Comment, {
  foreignKey: 'dashboard_id',
  onDelete: 'SET NULL'
});
module.exports = { User, Dashboard, Comment };