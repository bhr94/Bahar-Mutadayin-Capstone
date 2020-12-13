const bookshelf = require('../bookshelf');

const Event = bookshelf.model('Event', {
    tableName: 'events',
    users() {
      return this.belongsTo('User');
    },
  });
  
  module.exports = Event;
           