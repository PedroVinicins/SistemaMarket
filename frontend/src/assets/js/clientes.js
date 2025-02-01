// Adiciona um evento de submit no formulário de clientes
document.getElementById('form-clientes').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const endereco = document.getElementById('endereco').value;
    const nascimento = document.getElementById('nascimento').value;
    const cidade = document.getElementById('cidade').value;

    const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, cpf, endereco, nascimento, cidade })
    });

    if (response.ok) {
        alert('Cliente adicionado com sucesso!');
        document.getElementById('form-clientes').reset();
        carregarClientes(); // Atualiza a lista de clientes
    } else {
        alert('Erro ao adicionar cliente.');
    }
});

// Função para carregar os clientes
async function carregarClientes() {
    const response = await fetch('http://localhost:3000/clientes');
    const clientes = await response.json();

    const container = document.querySelector('.Todos-clientes');
    container.innerHTML = ''; // Limpa a lista anterior

    clientes.forEach(cliente => {
        const clienteDiv = document.createElement('div');
        clienteDiv.classList.add('cliente');
        clienteDiv.innerHTML = `
            <h1>${cliente.nome}</h1>
            <p>CPF: ${cliente.cpf}</p>
            <p>Endereço: ${cliente.endereco}</p>
            <p>Data de Nascimento: ${cliente.nascimento}</p>
            <p>Cidade: ${cliente.cidade}</p>
        `;
        container.appendChild(clienteDiv);
    });
}

// Carrega os clientes ao carregar a página
window.onload = carregarClientes;
