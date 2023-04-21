const { Pool } = require('pg');
const key = require('../utils/db_pgsql.js');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'postgres',
    password: key
});


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});