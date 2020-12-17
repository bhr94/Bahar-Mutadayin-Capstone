const bookshelf = require('../bookshelf');
const { v4: uuidv4 } = require("uuid");

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
