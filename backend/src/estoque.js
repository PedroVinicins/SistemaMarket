const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000; // Porta padrão sem segurança
const db = require('../models/db');

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos (HTML, CSS, JS) da pasta frontend
app.use(express.static(path.join(__dirname, '../../frontend/src')));

// conecxao com banco de dados

app.post('/estoque', (req, res) => {
    const { nome, preco, validade, quantidade } = req.body;

    const sql = "INSERT INTO estoque (nome, preco, validade, quantidade) VALUES (?, ?, ?, ?)";
   
    db.query(sql, [nome, preco, validade, quantidade], (err, result) => {
        if (err) {
            console.error('Erro ao inserir cliente:', err);
            res.status(500).send('Erro ao adicionar produto');
        } else {
            res.status(201).send('produto adicionado com sucesso');
        }
    });
});

// Rota para listar seus produtos
app.get('/estoque', (req, res) => {
    const sql = "SELECT * FROM estoque";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar produto:', err);
            res.status(500).send('Erro ao listar produto');
        } else {
            res.status(200).json(results);
        }
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/src/page/estoque.html'));
  });

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
