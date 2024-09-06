function loadTiposConsumidores() {
    fetch('/tipos_consumidores')  // URL da API para listar tipos de consumidores
        .then(response => response.json())
        .then(data => {
            let list = document.getElementById("tiposConsumidoresList");
            list.innerHTML = "";
            data.forEach(tipo => {
                list.innerHTML += `<div>${tipo.nome} - ${tipo.valor_kwh} KWh 
                <button onclick="editTipo(${tipo.id})">Editar</button>
                <button onclick="deleteTipo(${tipo.id})">Excluir</button>
                </div>`;
            });
        });
}

function showAddForm() {
    document.getElementById("tipoConsumidorForm").classList.remove("d-none");
    document.getElementById("formTitle").textContent = "Cadastrar novo Tipo de Consumidor";
    document.getElementById("tipoConsumidorId").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("valor_kwh").value = "";
}

function editTipo(id) {
    fetch(`/tipos_consumidores/${id}`)
        .then(response => response.json())
        .then(tipo => {
            document.getElementById("tipoConsumidorForm").classList.remove("d-none");
            document.getElementById("formTitle").textContent = "Editar Tipo de Consumidor";
            document.getElementById("tipoConsumidorId").value = tipo.id;
            document.getElementById("nome").value = tipo.nome;
            document.getElementById("valor_kwh").value = tipo.valor_kwh;
        });
}

function deleteTipo(id) {
    fetch(`/tipos_consumidores/${id}`, { method: 'DELETE' })
        .then(() => {
            alert('Tipo de Consumidor excluído com sucesso!');
            loadTiposConsumidores();
        });
}

document.getElementById("tipoConsumidorFormElement").addEventListener("submit", function(event) {
    event.preventDefault();
    let id = document.getElementById("tipoConsumidorId").value;
    let nome = document.getElementById("nome").value;
    let valor_kwh = document.getElementById("valor_kwh").value;

    let method = id ? 'PUT' : 'POST';
    let url = id ? `/tipos_consumidores/${id}` : '/tipos_consumidores';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, valor_kwh })
    })
    .then(response => {
        if (response.ok) {
            alert('Tipo de Consumidor salvo com sucesso!');
            loadTiposConsumidores();
            document.getElementById("tipoConsumidorForm").classList.add("d-none");
        } else {
            alert('Erro ao salvar o Tipo de Consumidor');
        }
    });
});

window.onload = function () {
    loadTiposConsumidores();
};