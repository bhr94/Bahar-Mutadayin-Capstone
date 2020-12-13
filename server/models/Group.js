const bookshelf = require('../bookshelf');

const Group = bookshelf.model('Group', {
  tableName: 'groups',
  users() {
    return this.hasMany('User');
  },
});

module.exports = Group;
