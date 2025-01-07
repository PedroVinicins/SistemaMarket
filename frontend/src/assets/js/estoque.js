document.getElementById('form-estoque').addEventListener('submit' , async function name(a) {
    a.preventDefault();

    const nome = document.getElementById('nome').value;
    const preco = document.getElementById('preco').value;
    const validade = document.getElementById('validade').value;
    const Quantidade = document.getElementById('Quantidade').value;

    const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, preco, validade, Quantidade})
    });

    if (response.ok) {
        alert('Cliente adicionado com sucesso!');
        document.getElementById('form-clientes').reset();
        carregarClientes(); // Atualiza a lista de clientes
    } else {
        alert('Erro ao adicionar cliente.');
    }

});

