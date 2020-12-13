exports.up = function (knex) {
  return knex.schema
    .createTable('groups', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
    })
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('firstName');
      table.string('lastName');
      table.string('email');
      table.integer('groupId').unsigned().references('groups.id');
    })
    .createTable('events', (table) => {
      table.increments('id').primary();
      table.date('startDate');
      table.date("endDate");
      table.string("title");
      table.string("description");
      table.integer('userId').unsigned().references('users.id');
    })
    .createTable('comments', (table) => {
      table.increments('id').primary();
      table.date("commentDate");
      table.string("commentContent");
      table.integer("likeCount").defaultTo(0);
      table.integer('ownerId').unsigned().references('users.id');
      table.integer('eventId').unsigned().references('events.id');
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable('comments')
    .dropTable('events')
    .dropTable('users')
    .dropTable('groups');
};
