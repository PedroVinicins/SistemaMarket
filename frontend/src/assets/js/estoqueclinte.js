document.getElementById('form-estoque').addEventListener('submit' , async function name(a) {
    a.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const validade = document.getElementById('validade').value;
    const quantidade = document.getElementById('quantidade').value;

    const response = await fetch('http://localhost:3000/estoque', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ nome, preco, validade, quantidade})
    });

    if (response.ok) {
        alert('Produto adicionado com sucesso!');
        document.getElementById('form-estoque').reset();
        carregarProdutos(); // Atualiza a lista de 
    } else {
        alert('Erro ao adicionar produto.');
    }

});

async function carregarProdutos() {
    const response = await fetch('http://localhost:3000/estoque');
    const produtos = await response.json();

    const container = document.querySelector('.tabela-de-estoque');
    container.innerHTML = ''; // Limpa a lista anterior

    produtos.forEach(produtos => {
        const produtosDiv = document.createElement('div');
        produtosDiv.innerHTML = `
            <h1>${produtos.nome}</h1>
            <p>preco: ${produtos.preco}</p>
            <p>validade: ${produtos.validade}</p>
            <p>quantidade: ${produtos.quantidade}</p>
        `;
        container.appendChild(produtosDiv);
    });
}

// Carrega os clientes ao carregar a página
window.onload = carregarProdutos;