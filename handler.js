'use strict';
const mongo = require('mongodb');
const { MongoClient } = mongo;
let db = null;

let connectToDatabase = (uri, dbName) => {
  if (db && db.serverConfig.isConnected()) {
    return Promise.resolve(db);
  }
  return MongoClient.connect(uri, { poolSize: 10, useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    db = client.db(dbName);
    return db;
  });
};

let getTodoById = (db, table, query) => {
  return db
    .collection(table)
    .findOne(query);
}

module.exports.getData = async event => {
  const dbConnection = await connectToDatabase("MONGODB_URI", "DB_NAME");
  const todo = await getTodoById(dbConnection, "todos", { id: 100 });

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};
