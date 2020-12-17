const bookshelf = require('../bookshelf');

const Invitation = bookshelf.model('Invitation', {
  tableName: 'invitations',
  groups() {
    return this.belongsTo('Group');
  },
});

module.exports = Invitation;
