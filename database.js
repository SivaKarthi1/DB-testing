const mysql = require('mysql2');

function connectToDatabase() {
  const connection = mysql.createConnection({
    host: '127.0.0.1', 
    port: '3306',
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
      if (error) {
        console.error('Error executing query: ' + error.stack);
        connection.end(); // Ensure connection is closed on error
        return;
      }
      console.log('Query results:', results);
      connection.end(); // Close the connection after the query
    });
  });

  // Handle connection errors
  connection.on('error', (err) => {
    console.error('Database connection error: ' + err.stack);
  });
}

// Call the function to connect to the database
connectToDatabase();
