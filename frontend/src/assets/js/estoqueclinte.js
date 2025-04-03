async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/estoque');
        if (!response.ok) throw new Error('Erro ao carregar produtos');
        
        const produtos = await response.json();
        const container = document.getElementById('tabela-de-estoque');
        
        if (!container) return;

        container.innerHTML = '';

        if (produtos.length === 0) {
            container.innerHTML = '<p>Nenhum produto cadastrado</p>';
            document.getElementById('total-value').textContent = '0.00';
            return;
        }

        produtos.forEach(produto => {
            // Convert price to number if it's a string
            const preco = typeof produto.preco === 'string' 
                ? parseFloat(produto.preco.replace(',', '.')) 
                : Number(produto.preco);
            
            const produtoDiv = document.createElement('div');
            produtoDiv.classList.add('estoque-item');
            produtoDiv.innerHTML = `
                <h3>${produto.nome}</h3>
                <p>Preço: R$ ${preco.toFixed(2)}</p>
                <p>Validade: ${new Date(produto.validade).toLocaleDateString('pt-BR')}</p>
                <p>Quantidade: ${produto.quantidade}</p>
                <p>Valor total: R$ ${(preco * produto.quantidade).toFixed(2)}</p>
            `;
            container.appendChild(produtoDiv);
        });

        const valorTotal = calcularValorTotal(produtos);
        document.getElementById('total-value').textContent = valorTotal.toFixed(2);
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        document.getElementById('tabela-de-estoque').innerHTML = 
            '<p>Erro ao carregar produtos. Recarregue a página.</p>';
    }
}

function calcularValorTotal(produtos) {
    return produtos.reduce((total, produto) => {
        // Convert price to number if it's a string
        const preco = typeof produto.preco === 'string' 
            ? parseFloat(produto.preco.replace(',', '.')) 
            : Number(produto.preco);
        return total + (preco * produto.quantidade);
    }, 0);
}

window.onload = carregarProdutos;