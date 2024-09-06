// Função para mostrar o formulário de adicionar bandeira
function showAddForm() {
    document.getElementById("bandeiraForm").classList.remove("d-none");
    document.getElementById("formTitle").textContent = "Cadastrar nova Bandeira";
    document.getElementById("bandeiraId").value = '';
    document.getElementById("nome").value = '';
    document.getElementById("tarifa").value = '';
}

// Função para listar as bandeiras existentes
function loadBandeiras() {
    fetch('/api/bandeiras')
        .then(response => response.json())
        .then(data => {
            const bandeirasList = document.getElementById('bandeirasList');
            bandeirasList.innerHTML = '';

            data.forEach(bandeira => {
                const div = document.createElement('div');
                div.classList.add('border', 'p-2', 'mb-2');
                div.innerHTML = `
                    <strong>${bandeira.nome}</strong> - Tarifa: R$ ${bandeira.tarifa.toFixed(2)}
                    <button class="btn btn-sm btn-warning ms-3" onclick="editBandeira(${bandeira.id})">Editar</button>
                    <button class="btn btn-sm btn-danger ms-2" onclick="deleteBandeira(${bandeira.id})">Excluir</button>
                `;
                bandeirasList.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar bandeiras:', error));
}

// Função para editar uma bandeira
function editBandeira(id) {
    fetch(`/api/bandeiras/${id}`)
        .then(response => response.json())
        .then(bandeira => {
            document.getElementById("bandeiraForm").classList.remove("d-none");
            document.getElementById("formTitle").textContent = "Editar Bandeira";
            document.getElementById("bandeiraId").value = bandeira.id;
            document.getElementById("nome").value = bandeira.nome;
            document.getElementById("tarifa").value = bandeira.tarifa;
        })
        .catch(error => console.error('Erro ao carregar bandeira:', error));
}

// Função para deletar uma bandeira
function deleteBandeira(id) {
    if (confirm("Deseja realmente excluir esta bandeira?")) {
        fetch(`/api/bandeiras/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Bandeira excluída com sucesso!');
                loadBandeiras();
            } else {
                alert('Erro ao excluir a bandeira');
            }
        })
        .catch(error => console.error('Erro ao excluir bandeira:', error));
    }
}

// Função para salvar a bandeira (adicionar ou editar)
document.getElementById("bandeiraFormElement").addEventListener("submit", function (event) {
    event.preventDefault();

    const bandeiraId = document.getElementById("bandeiraId").value;
    const nome = document.getElementById("nome").value;
    const tarifa = document.getElementById("tarifa").value;

    const method = bandeiraId ? 'PUT' : 'POST';
    const url = bandeiraId ? `/api/bandeiras/${bandeiraId}` : '/api/bandeiras';

    const data = {
        nome: nome,
        tarifa: parseFloat(tarifa)
    };

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Bandeira salva com sucesso!');
            document.getElementById("bandeiraForm").classList.add("d-none");
            loadBandeiras();
        } else {
            alert('Erro ao salvar a bandeira');
        }
    })
    .catch(error => console.error('Erro ao salvar bandeira:', error));
});

// Carregar as bandeiras ao abrir a página
document.addEventListener("DOMContentLoaded", function () {
    loadBandeiras();
});