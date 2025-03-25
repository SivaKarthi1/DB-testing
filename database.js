const mysql = require('mysql2');

function connectToDatabase() {
  const connection = mysql.createConnection({
    host: '127.0.0.1', 
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME 
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as id ' + connection.threadId);

    // Example query
    connection.query('SELECT * FROM users', (error, results) => {
      if (error) throw error;
      console.log(results);
      connection.end();
    });
  });
}

connectToDatabase();
