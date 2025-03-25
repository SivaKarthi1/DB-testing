const mysql = require('mysql2');
const readlineSync = require('readline-sync');

function checkDatabasePassword() {
  return readlineSync.question('Enter your database password: ', {
    hideEchoBack: true 
  });
}

function connectToDatabase() {
  const password = checkDatabasePassword();
  
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: password,
    database: 'my_database' 
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as id ' + connection.threadId);

    connection.query('SELECT * FROM users', (error, results) => {
      if (error) throw error;
      console.log(results);
      connection.end();
    });
  });
}

connectToDatabase();