const fs = require("fs");
const { Client } = require("pg");

const config = {
  user: "",
  password: "",
  host: "",
  port: "",
  database: "",
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("").toString(),
  },
};

const client = new Client(config);

client.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to PostgreSQL");
  }
});

module.exports = client;
