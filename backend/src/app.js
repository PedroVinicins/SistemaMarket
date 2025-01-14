require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const db = require('../models/db');

const app = express();
const PORT = process.env.PORT || 3000; // Porta padrão sem segurança

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Servir arquivos estáticos (HTML, CSS, JS) da pasta frontend
app.use(express.static(path.join(__dirname, '../../frontend/src')));



// Rota para adicionar cliente
app.post('/clientes', (req, res) => {
    const { nome, cpf, endereco, nascimento, cidade } = req.body;

    const sql = "INSERT INTO cadastraclientes (nome, cpf, endereco, nascimento, cidade) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nome, cpf, endereco, nascimento, cidade], (err, result) => {
        if (err) {
            console.error('Erro ao inserir cliente:', err);
            res.status(500).send('Erro ao adicionar cliente');
        } else {
            res.status(201).send('Cliente adicionado com sucesso');
        }
    });
});

// Rota para listar clientes
app.get('/clientes', (req, res) => {
    const sql = "SELECT * FROM cadastraclientes";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao listar clientes:', err);
            res.status(500).send('Erro ao listar clientes');
        } else {
            res.status(200).json(results);
        }
    });
});

// Rota principal para servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/src/page/novosClientes.html'));
  });

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});