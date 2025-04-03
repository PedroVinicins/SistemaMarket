
async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/estoque');
        const produtos = await response.json();

        const container = document.querySelector('.tabela-de-estoque');
        container.innerHTML = ''; // Limpa a lista anterior

        produtos.forEach(produto => {  
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('estoque');
            produtoDiv.innerHTML = `
                <h3>${produto.nome}</h3>
                <p>Preço: ${produto.preco}</p>
                <p>Validade: ${produto.validade}</p>
                <p>Quantidade: ${produto.quantidade}</p>
            `;
            container.appendChild(produtoDiv);
        });
        
        // Call exibirValorTotal after loading products
        exibirValorTotal();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

window.onload = carregarProdutos;