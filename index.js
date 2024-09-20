require('dotenv/config');
const express = require('express');
const mysql = require('mysql');

const port = process.env.PORT || 3000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');

const mysqlHost = process.env.MYSQL_HOST;
const mysqlPort = parseInt(process.env.MYSQL_PORT || '3306', 10);
const mysqlUser = process.env.MYSQL_USER;
const mysqlPassword = process.env.MYSQL_PASSWORD || '';
const mysqlDatabase = process.env.MYSQL_DATABASE;

const connection = mysql.createConnection({
  host: mysqlHost,
  port: mysqlPort,
  user: mysqlUser,
  password: mysqlPassword,
  database: mysqlDatabase,
});

connection.connect((err) => {
  if (err) {
    console.error(
      `Error connecting to MySQL at ${mysqlHost}:${mysqlPort}`,
      err,
    );
  } else {
    console.log(`Connected to MySQL at ${mysqlHost}:${mysqlPort}`);
  }
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying MySQL', err);
      res.status(500).send('Error querying MySQL');
    } else {
      res.render('index', { users: results });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
