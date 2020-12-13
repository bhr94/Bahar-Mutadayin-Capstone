const bookshelf = require('../bookshelf');

const User = bookshelf.model('User', {
  tableName: 'users',
  groups() {
    return this.belongsTo('Group');
  },
  events() {
    return this.hasMany('Event');
  },
  comments() {
    return this.hasMany('Comment');
  },
});

module.exports = User;
