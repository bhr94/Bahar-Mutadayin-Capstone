const bookshelf = require('../bookshelf');

const Comment = bookshelf.model('Comment', {
  tableName: 'comments',
  events() {
    return this.belongsTo('Event');
  },
  users() {
    return this.belongsTo('User');
  },
});

module.exports = Comment;
