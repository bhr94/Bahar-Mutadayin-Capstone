exports.up = function (knex) {
  return knex.schema
    .createTable("groups", (table) => {
      table.increments("id").primary();
      table.string("name");
      table.string("description")
    })
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("email");
      table.string("firstName");
      table.string("lastName");
      table.string("status");
      table
        .integer("groupId")
        .unsigned()
        .references("groups.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("invitations", (table) => {
      table.increments('id').primary()
      table.string("invitationCode");
      table.string("invitedEmail");
      table
        .integer("groupId")
        .unsigned()
        .references("groups.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("events", (table) => {
      table.increments("id").primary();
      table.datetime("start");
      table.datetime("end");
      table.string("title");
      table
        .integer("userId")
        .unsigned()
        .references("users.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("comments", (table) => {
      table.increments("id").primary();
      table.datetime("commentDate");
      table.string("commentContent");
      table.integer("likeCount").defaultTo(0);
      table.string("ownerName");
      table.integer("ownerId").unsigned().references("users.id");
      table
        .integer("eventId")
        .unsigned()
        .references("events.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTable("comments")
    .dropTable("events")
    .dropTable("users")
    .dropTable("groups");
};
