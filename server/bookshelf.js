// const knex = require('knex')(require('./knexfile'));
// const bookshelf = require('bookshelf')(knex);

// module.exports = bookshelf;

const knex =
    process.env.NODE_ENV === 'production'
        ? require('knex')(require('./knexfile').production)
        : require('knex')(require('./knexfile'));
const bookshelf = require('bookshelf')(knex);
module.exports = bookshelf;