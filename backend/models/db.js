const mysql = require('mysql2');

// Conexão com o banco de dados
// Nao esta sendo utilizado o dotenv poorque consegui fazer a conexao 
// ou seja as infotmações de conexao estao no proprio codigo!! SEM SEGURANÇA
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'tabelasdeprodutoseclientes',
  connectionLimit: 10
});

db.getConnection((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conexão com o banco de dados bem-sucedida!');
  }
});

module.exports = db;
