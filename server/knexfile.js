module.exports = {
  // client: "mysql",
  // connection: {
  //   host: "127.0.0.1",
  //   user: "root",
  //   password: "root",
  //   database: "capstone",
  //   charset: "utf8",
  // },
  production: {
    client: "mysql",
    connection: process.env.JAWSDB_URL,
  },
};
